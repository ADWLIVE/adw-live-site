// ADW LIVE — Stripe Checkout as a Vercel Serverless Function (no server to keep running)
// -------------------------------------------------------------------------------------
// 1. Put this file at:  api/create-checkout-session.js  in a Vercel project
// 2. Run: npm install stripe
// 3. In Vercel > Settings > Environment Variables add:
//      STRIPE_SECRET_KEY = sk_live_xxx
//      SITE_URL          = https://yourdomain.com
// 4. Deploy. Your endpoint URL becomes:
//      https://your-project.vercel.app/api/create-checkout-session
//    Paste that into the tickets page "Checkout endpoint" tweak.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const SITE_URL = process.env.SITE_URL || 'https://example.com';

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { line_items, event } = req.body;
    if (!Array.isArray(line_items) || !line_items.length) {
      return res.status(400).json({ error: 'No line items provided.' });
    }
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      phone_number_collection: { enabled: true },
      success_url: `${SITE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/tickets`,
      metadata: { event: event || 'haunted-takeover-2026' },
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
