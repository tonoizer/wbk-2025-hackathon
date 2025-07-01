# KIT Hackathon

## Run the project

```bash
pnpm dev
```

## Supabase

Create a `.env` file in the root directory and add the following variables:

```
SUPABASE_URL=https://beierthon.klzdev.com
SUPABASE_KEY=<your-supabase-key>

NUXT_PUBLIC_SUPABASE_URL=https://beierthon.klzdev.com
NUXT_PUBLIC_SUPABASE_KEY=<your-supabase-key>

# This is the URL of the site, used for email redirects for development only
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deployment

Add this as an environment variable in the deployment provider:

```
NUXT_PUBLIC_SITE_URL=https://hackathon.kevinbeier.com
```

# Troubleshooting

> [nuxt] error caught during app initialization Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!

This is because in the `.env` file, the key is not set properly.
