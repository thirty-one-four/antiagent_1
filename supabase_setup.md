# 🚀 Supabase Setup Guide

To make your "Antigravity" questions site work, you need to set up a database. Follow these steps!

## 1. Create a Project
1. Go to [database.new](https://database.new) (Supabase).
2. Sign in with GitHub.
3. Click "New Project".
4. Name it: `Antigravity Questions`.
5. Create a secure password for your database.
6. Region: Select one close to you.
7. Click **Create new project**.

## 2. Create the Table
Once your project is ready (takes ~1 minute):
1. Go to the **Table Editor** (icon looks like a table on the left).
2. Click **Create a new table**.
3. Name: `questions`.
4. **Important**: Enable "Row Level Security (RLS)" (checked by default).
5. Add Columns:
    - `id`: int8, Primary Key (default)
    - `created_at`: timestamptz (default)
    - `user_name`: text (Type "text" in the type dropdown)
    - `content`: text
6. Click **Save**.

## 3. Allow Public Inserts (Permissions)
Since we aren't doing log-ins, we need to let "anyone" submit a question.
1. In the **Table Editor**, click on your `questions` table.
2. Click the **RLS** button (or go to **Authentication** > **Policies** in the sidebar).
3. You'll see "Row Level Security is enabled for this table" - click **New Policy**.
4. Click **Create a policy from scratch** (or if you see templates, choose one for INSERT).
5. Give it a name like `"Allow public inserts"`.
6. For **Policy Command**, select `INSERT`.
7. For **Target Roles**, select `public`.
8. For the **USING expression** (or WITH CHECK), enter: `true`
9. Click **Review** then **Save Policy**.

*(Note: This means anyone can insert questions, but they can't read or delete them unless you add additional policies)*

## 4. Get Your Keys
1. Go to **Project Settings** (gear icon) -> **API**.
2. Copy the **Project URL**.
3. Copy the **anon / public** Key.

## 5. Connect Your App
1. Open `app.js` in your editor.
2. Paste the URL into `SUPABASE_URL`.
3. Paste the Key into `SUPABASE_ANON_KEY`.

Do this, and your form will work! 
