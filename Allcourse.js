// Fetch ratings from the server and display them
const loadRating = () => {
    fetch("http://online-school-k56h.onrender.com/Teacher/reviews/")
        .then((res) => res.json())
        .then((data) => displayRating(data))
        .catch((err) => console.error("Failed to load ratings:", err));
};

// Display ratings on the webpage
const displayRating = (allRatings) => {
    const parent = document.getElementById("service-container");
    if (!parent) {
        console.error("Element with ID 'service-container' not found.");
        return;
    }
    parent.innerHTML = ''; // Clear existing content

    allRatings.forEach((rating) => {
        const li = document.createElement("li");
        li.className = "rating-item"; // Add a class for styling
        li.innerHTML = `
            <div class="card shadow h-100">
                <div class="card-body p-3 p-xl-5">
                    <h3 class="card-title h5">${rating.Reviewer}</h3>
                    <p class="card-text">${rating.Course}</p>
                    <a href="#" class="btn btn-primary">Details</a>
                </div>
            </div>
        `;
        parent.appendChild(li);
    });
};

// Call the function to load ratings when the page loads
loadRating();