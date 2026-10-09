# Nilus Restaurant - Database-Driven Menu

This version turns the Nilus QR menu into a maintainable database-backed website.

## What the manager can do

From `admin.html`, an authenticated manager can:

- create a brand-new category
- edit a category
- hide/show a category
- delete a category
- add food items inside any category
- edit food names and descriptions
- change ETB prices
- add/change food image URLs
- hide a food item without deleting it
- delete food items
- control display order

The customer page reads the menu from Supabase. The QR code can continue pointing to the same website URL even when the manager changes the menu.

## Step 1 - Create the database

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Open `supabase-schema.sql` from this project.
4. Paste the entire file into the SQL Editor and run it.
5. The seven current Nilus categories are inserted automatically.

## Step 2 - Create the manager account

1. In Supabase, open **Authentication -> Users**.
2. Create the manager's email/password account.
3. Copy that user's UUID.
4. In SQL Editor run:

```sql
insert into public.manager_profiles (user_id, role)
values ('PASTE-MANAGER-UUID-HERE', 'admin');
```

Only users in `manager_profiles` can change the menu.

## Step 3 - Connect the website

Open `config.js` and replace:

```js
window.NILUS_CONFIG = {
  supabaseUrl: 'https://uouwjqhqkqhioasvyvve.supabase.co',
  supabasePublishableKey: 'sb_publishable_hqkLl8kEq24nM7vFDEoj1A_48_QtDgZ'
};
```

Get these values from **Supabase -> Project Settings -> API**.

Use the publishable key (or the older anon key if that is what your project shows). **Never put a service-role/secret key in the website.**

## Step 4 - Test

Open `index.html` through a local web server, not by double-clicking the file. For example, in VS Code use Live Server.

Open `admin.html` and sign in with the manager account.

Try:

1. Create a category called `Desserts`.
2. Open `+ Add Food` on that category.
3. Add a food name, description and ETB price.
4. Save it.
5. Open the customer menu and check the new category.

## Step 5 - Deploy later

The project can be deployed to Vercel as a static site. The same Supabase database continues to serve the deployed customer site and manager dashboard.

## Important security rule

The browser must only contain the Supabase project URL and publishable/anon key. Never expose a Supabase `service_role` or secret key in HTML, JavaScript, GitHub, or Vercel environment variables intended for the browser.

## Next upgrade

The current dashboard uses image URLs. The next step can add a Supabase Storage bucket so the manager can click **Upload Image** and choose a food/category photo directly from the computer or phone.

## Step 3 — Image uploads
1. In Supabase Storage, create a bucket named `menu-images` and make it Public.
2. Run the Storage policy section in `supabase-schema.sql` (or run the complete schema on a fresh project).
3. The Manager Dashboard now lets managers upload category and food images directly. Files are limited to 5 MB and are stored under `categories/` or `food/`.
4. Customers can view images, while only authenticated managers can upload, replace, or delete them.
