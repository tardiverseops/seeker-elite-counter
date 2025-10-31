export default function handler(req, res) {
    // Replace with your actual logic (Brevo API, database, etc.)
    const totalSpots = 500;
    const takenSpots = 127; // Pull this from Brevo or your database
    const remaining = totalSpots - takenSpots;

    res.status(200).json({ remaining });
}
