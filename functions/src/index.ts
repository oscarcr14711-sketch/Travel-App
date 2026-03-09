import * as functions from "firebase-functions";
import fetch from "node-fetch";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FlightLookupRequest {
    flightNumber: string;
    date: string; // YYYY-MM-DD
}

interface AeroDataBoxFlight {
    number?: string;
    airline?: { name?: string };
    departure?: {
        airport?: { municipalityName?: string; name?: string; iata?: string };
        scheduledTime?: { local?: string; utc?: string };
        terminal?: string;
        gate?: string;
    };
    arrival?: {
        airport?: { municipalityName?: string; name?: string; iata?: string };
        scheduledTime?: { local?: string; utc?: string };
        terminal?: string;
    };
    aircraft?: { model?: string };
    status?: string;
}

// ─── Helper: parse ISO local time ─────────────────────────────────────────────

function parseDateTime(iso?: string): { date: string; time: string } {
    if (!iso) return { date: "", time: "" };
    const [d, t] = iso.replace("T", " ").split(" ");
    if (!d) return { date: "", time: "" };
    const [y, m, day] = d.split("-");
    return {
        date: `${m}/${day}/${y}`,
        time: t ? t.substring(0, 5) : "",
    };
}

// ─── Cloud Function ───────────────────────────────────────────────────────────

export const lookupFlight = functions
    .runWith({ secrets: ["AERODATABOX_API_KEY"] })
    .https.onCall(async (data: FlightLookupRequest, context) => {
        const { flightNumber, date } = data;

        if (!flightNumber || !date) {
            throw new functions.https.HttpsError(
                "invalid-argument",
                "flightNumber and date are required"
            );
        }

        const apiKey = process.env.AERODATABOX_API_KEY;
        if (!apiKey) {
            throw new functions.https.HttpsError(
                "internal",
                "API key not configured on server"
            );
        }

        const clean = flightNumber.trim().toUpperCase().replace(/\s/g, "");
        const url = `https://aerodatabox.p.rapidapi.com/flights/number/${clean}/${date}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
            },
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new functions.https.HttpsError(
                    "resource-exhausted",
                    "API_RATELIMIT_EXCEEDED"
                );
            }
            if (response.status === 403) {
                throw new functions.https.HttpsError(
                    "permission-denied",
                    "API_FORBIDDEN"
                );
            }
            throw new functions.https.HttpsError(
                "not-found",
                `AeroDataBox returned ${response.status}`
            );
        }

        const rawData = (await response.json()) as AeroDataBoxFlight[] | AeroDataBoxFlight;
        const f: AeroDataBoxFlight | undefined = Array.isArray(rawData) ? rawData[0] : rawData;
        if (!f) {
            throw new functions.https.HttpsError("not-found", "Flight not found");
        }

        const dep = parseDateTime(
            f.departure?.scheduledTime?.local || f.departure?.scheduledTime?.utc
        );
        const arr = parseDateTime(
            f.arrival?.scheduledTime?.local || f.arrival?.scheduledTime?.utc
        );

        return {
            airline: f.airline?.name || "",
            flightNumber: f.number || clean,
            origin: f.departure?.airport?.municipalityName || f.departure?.airport?.name || "",
            originIata: f.departure?.airport?.iata || "",
            destination: f.arrival?.airport?.municipalityName || f.arrival?.airport?.name || "",
            destinationIata: f.arrival?.airport?.iata || "",
            departureDate: dep.date,
            departureTime: dep.time,
            arrivalDate: arr.date,
            arrivalTime: arr.time,
            aircraftModel: f.aircraft?.model || null,
            departureTerminal: f.departure?.terminal || null,
            departureGate: f.departure?.gate || null,
            arrivalTerminal: f.arrival?.terminal || null,
            status: f.status || "scheduled",
        };
    });
