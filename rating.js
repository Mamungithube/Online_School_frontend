async function fetchReviews() {
    try {
        const response = await fetch('http://127.0.0.1:8000/Teacher/reviews/');
        console.log("Fetching reviews...");

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const reviews = await response.json();
        console.log("Fetched Reviews:", reviews); // Log the reviews to verify the structure
        displayReviews(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = ''; // Clear previous content

    reviews.forEach((review, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('carousel-item');
        if (index === 0) {
            reviewItem.classList.add('active'); // Make the first item active
        }

        reviewItem.innerHTML = `
            <div class="review-card shadow">
                <div class="card-body text-center">
                    <h5 class="card-title">${review.Course}</h5> <!-- Course Name -->
                    <p class="card-text">${review.body}</p> <!-- Review Body -->
                    <p class="card-text"><strong>Rating:</strong> ${review.rating}</p> 
                    <p class="card-text"><em>Reviewed by: ${review.reviewer}</em></p>
                    <p class="card-text"><em>Reviewed by: ${review.created}</em></p>
                </div>
            </div>
        `;

        reviewsContainer.appendChild(reviewItem);
    });
}

window.onload = fetchReviews;