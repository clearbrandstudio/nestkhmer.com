# Deployment Guide (Coolify)

1. Access your Coolify Dashboard.
2. Navigate to your project -> **Configuration** tab.
3. Scroll down to the **Build** section and enter the following:
   - **Install Command:** `npm install`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start --prefix apps/web`

## Database Connection
If you are using an external database (e.g., Supabase, Neon), you simply paste your connection string into the **Environment Variables** tab in Coolify:
`DATABASE_URL="postgresql://user:password@host/dbname"`
