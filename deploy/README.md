# ADW LIVE — Website

Static site (`index.html`, `tickets.html`) + a Stripe Checkout serverless function.

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → Import Git Repository** and pick the repo.
3. Framework preset: **Other**. No build command needed.
4. Add Environment Variables:
   - `STRIPE_SECRET_KEY` = your `sk_live_...` (or `sk_test_...`)
   - `SITE_URL` = your deployed domain, e.g. `https://adwlive.com`
5. Deploy. Your checkout endpoint becomes:
   `https://<project>.vercel.app/api/create-checkout-session`

## Connect checkout to the page
Open `tickets.html`, and in the Tweaks/props set **checkoutEndpoint** to the URL above,
or hardcode it in the tickets logic. Buyers then redirect to real Stripe Checkout.

## Files
- `index.html` — landing page
- `tickets.html` — ticketing flow (select → attendee details → Stripe)
- `support.js` — runtime
- `assets/` — images
- `api/create-checkout-session.js` — Stripe session endpoint
