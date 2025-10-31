export default async function handler(req, res) {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const MAX_SPOTS = parseInt(process.env.TOTAL_SEEKER_ELITE) || 100;
    const LIST_ID = 4; // Your Brevo list ID for Seeker Elite

    // Set CORS headers for embedding
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        const response = await fetch(`https://api.brevo.com/v3/contacts/lists/${LIST_ID}`, {
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Brevo API returned ${response.status}`);
        }

        const data = await response.json();
        const totalSubscribers = data.totalSubscribers || 0;
        const remaining = Math.max(0, MAX_SPOTS - totalSubscribers);

        res.status(200).json({ 
            remaining,
            totalSubscribers,
            maxSpots: MAX_SPOTS
        });

    } catch (error) {
        console.error('Brevo API Error:', error);
        res.status(500).json({ 
            remaining: '???',
            error: 'Failed to fetch subscriber count'
        });
    }
}
