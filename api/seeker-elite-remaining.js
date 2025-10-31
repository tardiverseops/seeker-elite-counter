export default async function handler(req, res) {
  const TOTAL = parseInt(process.env.TOTAL_SEEKER_ELITE || "100", 10);

  try {
    const r = await fetch("https://api.brevo.com/v3/contacts/lists/4", {
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY
      }
    });

    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();

    const used = data.totalSubscribers || 0;
    const remaining = Math.max(TOTAL - used, 0);

    res.status(200).json({ total: TOTAL, remaining });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
