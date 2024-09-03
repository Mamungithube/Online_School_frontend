// // Fetch ratings from the server and display them
// const loadRating = () => {
//     const token = localStorage.getItem("authToken");

//     fetch("http://online-school-k56h.onrender.com/Teacher/reviews/", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `token ${token}`,
//         },
//     })
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error(`Failed to load ratings: ${res.status} ${res.statusText}`);
//             }
//             return res.json();
//         })
//         .then((data) => displayRating(data))
//         .catch((err) => console.error("Failed to load ratings:", err));
// };

// // Display ratings on the webpage
// const displayRating = (allRatings) => {
//     const parent = document.getElementById("service-container");
//     if (!parent) {
//         console.error("Element with ID 'service-container' not found.");
//         return;
//     }
//     parent.innerHTML = ''; // Clear existing content

//     allRatings.forEach((rating) => {
//         const li = document.createElement("li");
//         li.className = "rating-item"; // Add a class for styling
//         li.innerHTML = `
//             <div class="card shadow h-100">
//                 <div class="card-body p-3 p-xl-5">
//                     <h3 class="card-title h5">${rating.Reviewer}</h3>
//                     <p class="card-text">${rating.Course}</p>
//                     <a href="#" class="btn btn-primary">Details</a>
//                 </div>
//             </div>
//         `;
//         parent.appendChild(li);
//     });
// };

// // Call the function to load ratings when the page loads
// loadRating();

// solved
// async function fetchReviews() {
//     try {
//         const response = await fetch('https://online-school-k56h.onrender.com/Teacher/reviews/');
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }

//         const reviews = await response.json();

//         displayReviews(reviews);
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//     }
// }

// function displayReviews(reviews) {
//     const reviewsContainer = document.getElementById('reviews-container');

//     reviewsContainer.innerHTML = '';

//     reviews.forEach(review => {
//         const reviewCard = document.createElement('div');
//         reviewCard.classList.add('review-card');
//         reviewCard.innerHTML = `
//             <h3>${review.title}</h3>  <!-- Assuming the review has a title field -->
//             <p>${review.content}</p>  <!-- Assuming the review has a content field -->
//             <p><strong>Rating:</strong> ${review.rating}</p>  <!-- Assuming the review has a rating field -->
//             <p><em>Reviewed by: ${review.reviewer}</em></p>

//         `;
//         reviewsContainer.appendChild(reviewCard);
//     });
// }

// window.onload = fetchReviews;

async function fetchReviews() {
    try {
        const response = await fetch('https://online-school-k56h.onrender.com/Teacher/reviews/');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const reviews = await response.json();
        displayReviews(reviews);
        console.log(reviews);
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
            <div class="d-flex justify-content-center align-items-center" style="min-height: 300px;">
                <div class="text-center">
                    <h3>${review.Course}</h3>
                    <p>${review.body}</p>
                    <p><strong>Rating:</strong> ${review.rating}</p>
                    <p><em>Reviewed by: ${review.reviewer}</em></p>
                </div>
            </div>
        `;

        reviewsContainer.appendChild(reviewItem);
    });
}

window.onload = fetchReviews;
