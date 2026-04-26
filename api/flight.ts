export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Add CORS headers in case you run the app on the web
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const flightNumber = url.searchParams.get('flightNumber');
    const date = url.searchParams.get('date');

    if (!flightNumber || !date) {
      return new Response(JSON.stringify({ error: 'Missing flightNumber or date' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Call RapidAPI using the secret Environment Variable
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY?.trim();
    
    if (!RAPIDAPI_KEY) {
      return new Response(JSON.stringify({ error: 'Server misconfiguration: Missing API Key' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Temporary debug — remove after confirming key is correct
    console.log(`API Key length: ${RAPIDAPI_KEY.length}, starts with: ${RAPIDAPI_KEY.substring(0, 6)}`);

    const response = await fetch(
      `https://aerodatabox.p.rapidapi.com/flights/number/${flightNumber}/${date}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
         return new Response(JSON.stringify({ error: 'Flight not found' }), {
           status: 404,
           headers: { 'Content-Type': 'application/json', ...corsHeaders }
         });
      }
      return new Response(JSON.stringify({ error: `API error: ${response.status}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const data = await response.json();
    
    // Return the exact same flight data back to the app, but securely
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json', 
        'Cache-Control': 's-maxage=600, stale-while-revalidate',
        ...corsHeaders 
      },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
