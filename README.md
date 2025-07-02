# WBK 2025 Hackathon

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

## Deployment

Add this as an environment variable in the deployment provider:

```
NUXT_PUBLIC_SITE_URL=https://hackathon.kevinbeier.com
```

## Supabase Storage Setup for File Uploads and Downloads

To enable users to upload and download STL files in this app, you must configure Supabase Storage and Row Level Security (RLS) policies as follows:

### 1. Create a Storage Bucket
- Go to your Supabase project dashboard.
- Navigate to **Storage** > **Buckets**.
- Create a new bucket (e.g., `stl-bucket`).
- **Do NOT** enable "Public bucket" unless you want anyone to be able to download files without authentication.

### 2. Enable Row Level Security (RLS)
- RLS is enabled by default for new buckets. If not, enable it in the bucket settings.

### 3. Add RLS Policies

#### Allow Authenticated Users to Upload Files
Paste this SQL in the SQL Editor:

```sql
CREATE POLICY "Allow authenticated uploads to stl-bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'stl-bucket');
```

#### Allow Authenticated Users to Download Files
Paste this SQL in the SQL Editor:

```sql
CREATE POLICY "Allow authenticated reads from stl-bucket"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'stl-bucket');
```

- Make sure both policies are **enabled** after creation.
- Replace `stl-bucket` with your actual bucket name if different.

### 4. Usage in the App
- Users must be authenticated (logged in) to upload or download STL files.
- Uploaded files are stored in the bucket and their URLs/paths are saved in the database.

### 5. (Optional) Public Downloads
If you want anyone (even unauthenticated users) to download files, you can add this policy:

```sql
CREATE POLICY "Allow public reads from stl-bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'stl-bucket');
```

## Supabase Storage Access Policy

To allow authenticated users to download files from the private STL bucket, add the following policy in the Supabase SQL editor:

```sql
create policy "Allow authenticated downloads"
on storage.objects
for select
to authenticated
using (bucket_id = 'stl-bucket');
```

## Row Level Security (RLS) Policies

### print_quality_status Table

To allow your application to join and read from the `print_quality_status` table, you must enable Row Level Security (RLS) and add a policy that allows SELECT access for authenticated users.

**SQL Example:**
```sql
ALTER TABLE print_quality_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read"
  ON print_quality_status
  FOR SELECT
  TO authenticated
  USING (true);
```

**Supabase UI Steps:**
1. Go to the `print_quality_status` table in the dashboard.
2. Click on the "Policies" tab.
3. Click "Create policy".
4. Name: Allow authenticated read
5. Action: SELECT
6. Apply to roles: authenticated
7. Using expression: `true`
8. Save and enable the policy.

This policy is required for your app to fetch the quality type for each print via a foreign key join.

---

**Without these policies, file upload and download will not work!**

# Troubleshooting

> [nuxt] error caught during app initialization Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!

This is because in the `.env` file, the key is not set properly.
