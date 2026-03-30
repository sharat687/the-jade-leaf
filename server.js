// Add these variables at the top of server.js
let totalSpots = 50; // Starting capacity for the night

app.post('/reserve', (req, res) => {
    const { name, date, guests } = req.body;
    const numGuests = parseInt(guests);

    if (totalSpots >= numGuests) {
        totalSpots -= numGuests; // Subtract guests from total
        
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

// Add a route to check spots when page loads
app.get('/spots', (req, res) => {
    res.json({ remainingSpots: totalSpots });
});