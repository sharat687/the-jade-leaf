const form = document.getElementById('res-form');

form.addEventListener 'submit', async (e) => 
    e.preventDefault();

    const bookingData = {
        name: document.getElementById('cust-name').value,
        date: document.getElementById('res-date').value,
        guests: 2 // You can add a guest select to your HTML
    };

    try {
        const response = await fetch('http://localhost:3000/reserve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();
        if (result.success) {
            alert("✨ Success! Check your email for confirmation.");
            form.reset();
        }
    } catch (err) {
        alert("Booking failed. Is the server running?");
    }
    const resForm = document.getElementById('booking-form');

if (resForm) 
    resForm.addEventListener 'submit', async (e) => 
        e.preventDefault(); // This stops the page from refreshing

        // 1. Collect the data from the inputs
        const formData = {
            name: document.getElementById('name').value,
            date: document.getElementById('date').value,
            guests: document.getElementById('guests').value
        };

        console.log("Sending data:", formData);

        try {
            // 2. Send data to your Node.js backend
            const response = await fetch('http://localhost:3000/reserve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert("✨ Table Reserved! See you at The Jade Leaf.");
                resForm.reset();
            } else {
                alert("Server error: " + result.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Connection Failed! Make sure to run 'node server.js' in your terminal.");
        }
        const resForm = document.getElementById('booking-form');
const spotsDisplay = document.getElementById('spots-counter');
const successBox = document.getElementById('success-message');

// 1. Fetch available spots on page load
async function updateSpots() {
    try {
        const response = await fetch('http://localhost:3000/spots');
        const data = await response.json();
        spotsDisplay.innerText = `🔥 Only ${data.remainingSpots} spots left tonight!`;
    } catch (err) {
        spotsDisplay.innerText = "Check back soon for availability.";
    }
}
updateSpots();

// 2. Handle Form Submission
resForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        guests: document.getElementById('guests').value
    };

    try {
        const response = await fetch('http://localhost:3000/reserve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            // Update the counter
            spotsDisplay.innerText = `🔥 Only ${result.remainingSpots} spots left tonight!`;
            
            // Hide form and show success message
            resForm.style.display = 'none';
            successBox.style.display = 'block';
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Server is offline. Run 'node server.js'!");
    }
});
    
