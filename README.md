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
```

# Troubleshooting

> [nuxt] error caught during app initialization Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!

This is because in the `.env` file, the key is not set properly.
