// async function fetchReviews() {
//     try {
//         const response = await fetch("http://online-school-k56h.onrender.com/Teacher/list/");
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }

//         const reviews = await response.json();
//         displayReviews(reviews);
//         console.log(reviews);
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//     }
// }

// function displayReviews(reviews) {
//     const reviewsContainer = document.getElementById('service-container');
//     reviewsContainer.innerHTML = ''; // Clear previous content

//     reviews.forEach((review, index) => {
//         const reviewItem = document.createElement('div');
//         reviewItem.classList.add('carousel-item');
//         if (index === 0) {
//             reviewItem.classList.add('active'); // Make the first item active
//         }

//         reviewItem.innerHTML = `
//             <div class="d-flex justify-content-center align-items-center" style="min-height: 300px;">
//                 <div class="text-center">
//                     <h3>${review.Course}</h3>
//                     <p>${review.body}</p>
//                     <p><strong>Rating:</strong> ${review.rating}</p>
//                     <p><em>Reviewed by: ${review.reviewer}</em></p>
//                 </div>
//             </div>
//         `;

//         reviewsContainer.appendChild(reviewItem);
//     });
// }

// window.onload = fetchReviews;

async function fetchTeacherList() {
    try {
        const response = await fetch("https://online-school-k56h.onrender.com/Teacher/list/");

        if (!response.ok) {
            throw new Error("Failed to fetch the teacher list");
        }

        const teachers = await response.json();

        const teacherList = document.getElementById("teacherList");
        teacherList.innerHTML = "";

        teachers.forEach(teacher => {
            const teacherCard = document.createElement("div");
            teacherCard.className = "teacher-card";
            teacherCard.innerHTML = `
                <h2>${teacher.name}</h2>
                <p>Subject: ${teacher.subject}</p>
                <p>Email: ${teacher.email}</p>
            `;
            teacherList.appendChild(teacherCard);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}
fetchTeacherList();