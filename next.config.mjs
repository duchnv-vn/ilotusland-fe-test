/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['src']
    }, env: {
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        APP_DOMAIN: process.env.APP_DOMAIN,
        AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
        AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
        AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
        SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
        SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
    }
};

export default nextConfig;