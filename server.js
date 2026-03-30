const express = require('express');
const path = require('path');
const cors = require('cors'); // Good to have for cross-origin requests
const app = express();

// 1. Setup Port for Hugging Face (7860)
const PORT = process.env.PORT || 7860;

// 2. Middleware
app.use(cors());
app.use(express.json());
// Serves your index.html, style.css, etc. from the current folder
app.use(express.static(path.join(__dirname, '/')));

// 3. Variables (Define only ONCE at the top)
let totalSpots = 50; 

// 4. Routes
// Check remaining spots when page loads
app.get('/spots', (req, res) => {
    res.json({ remainingSpots: totalSpots });
});

// Handle the booking
app.post('/reserve', (req, res) => {
    const { name, date, guests } = req.body;
    const numGuests = parseInt(guests);

    if (totalSpots >= numGuests) {
        totalSpots -= numGuests; // Deduct the spots
        
        console.log(`Booking for ${name}: ${numGuests} seats. Remaining: ${totalSpots}`);

        res.json({ 
            success: true, 
            message: "Reservation confirmed!",
            remainingSpots: totalSpots 
        });
    } else {
        res.json({ 
            success: false, 
            message: "Sorry, we are fully booked for this time!" 
        });
    }
});

// 5. Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Jade Leaf is running on port ${PORT}`);
});