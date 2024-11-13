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
                    <u><h2 class="card-title ">Course Name : ${review.course_title}</h2> </u>
                    <h4 class="card-text"><em>My Name is : ${review.reviewer_name}</em></h4>
                    <h5 class="card-text">My Review is ${review.body}</h5> <!-- Review Body -->
                    <h5 class="card-text"><strong>My Rating is : </strong> ${review.rating}</h5> 
                    <p class="card-text"><em>Reviewed by: ${review.created}</em></p>
                </div>
            </div>
        `;

        reviewsContainer.appendChild(reviewItem);
    });
}

window.onload = fetchReviews;