# KIT Hackathon

## Run the project

```bash
pnpm dev
```

## Supabase

Create a `.env.local` file in the root directory and add the following variables:

```
SUPABASE_URL=https://beierthon.klzdev.com
SUPABASE_KEY=<your-key>

NUXT_PUBLIC_SUPABASE_URL=https://beierthon.klzdev.com
NUXT_PUBLIC_SUPABASE_KEY=<your-key>
```

and also add the key to the existing `.env` file:

```
SUPABASE_KEY=<your-key>
NUXT_PUBLIC_SUPABASE_KEY=<your-key>
```


# Troubleshooting

> [nuxt] error caught during app initialization Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!

This is because in the `.env` file, the key is not set properly.
