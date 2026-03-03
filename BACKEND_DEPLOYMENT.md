# Deploying the Free Flight API Backend

We have set up a Serverless Edge Function to securely handle real-time flight requests without exposing your API keys in the app. This replaces the need for a paid Firebase Blaze plan.

## 1. Deploying to Vercel (Free)

The easiest way to host this function is by linking it to your GitHub repository:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Under "Import Git Repository", find your **Travel-App** repository and click **Import**.
4. Leave all the default settings (Framework Preset: Other) and click **Deploy**.

Vercel will immediately detect the `api/flight.ts` file you just pushed to GitHub and automatically deploy it!

## 2. Setup Your Secret API Key

Once deployed, you need to give Vercel your RapidAPI key securely:

1. Go to your [Vercel Dashboard](https://vercel.com) -> Select your new project -> Go to **Settings** -> **Environment Variables**.
2. Add a new variable:
   - **Key:** `RAPIDAPI_KEY`
   - **Value:** *Your actual key from RapidAPI* (starts with `1ac2ba1a...`)
3. Save it, and then go to the **Deployments** tab and click **Redeploy** on your latest deployment so it securely loads the new key.

## 3. Connect the App

1. Vercel will give you a production domain for your backend (e.g., `https://travel-app-backend.vercel.app`).
2. Open `src/services/flight.service.ts` in your code.
3. Update the `BACKEND_API_URL` variable to point to your new domain:
   ```typescript
   const BACKEND_API_URL = 'https://your-vercel-domain.vercel.app/api';
   ```
   *(Or you can define `EXPO_PUBLIC_FLIGHT_API_URL` in a `.env` file if you prefer).*

That's it! Your app will now securely fetch real-time flights completely for free.
