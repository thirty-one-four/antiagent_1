# Quick Fix: Add Missing Column to Supabase

Your `questions` table is missing the `user_name` column. Here's how to add it:

## Option 1: Using Table Editor (Easiest)
1. Go to Supabase Dashboard → **Table Editor**
2. Click on the `questions` table
3. Click **+ New Column** (or the **+** button)
4. Fill in:
   - **Name**: `user_name`
   - **Type**: `text`
   - **Default value**: Leave empty or set to `'Anonymous'`
   - **Allow nullable**: ✅ Check this
5. Click **Save**

## Option 2: Using SQL Editor
1. Go to **SQL Editor** in Supabase
2. Run this command:
```sql
ALTER TABLE questions 
ADD COLUMN user_name TEXT;
```
3. Click **Run**

## Note
I've updated the code to remove `user_name` from the insert for now, so the form will work immediately. You can add the column later if you want to track user names!
