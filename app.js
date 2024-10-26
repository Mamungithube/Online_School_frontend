// Function to fetch course data and display it
const fetchAndDisplayCourses = () => {
  fetch("http://127.0.0.1:8000/Course/list//")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Fetched Data:', data); // Log fetched data for debugging
      displayCourses(data); // Call function to display courses
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
};

// Function to display courses on the webpage
const displayCourses = (courses) => {
  const parent = document.getElementById("courses");
  if (!parent) {
    console.error("Parent element not found");
    return;
  }


  if (!Array.isArray(courses)) {
    console.error("Expected an array of courses");
    return;
  }

  courses.forEach(course => {
    // Verify that course object contains expected properties
    console.log('Course Data:', course);

    const courseDiv = document.createElement("div");
    courseDiv.classList.add("course-card");

    courseDiv.innerHTML = `
      <div class="card">
        <img src="${course.image}" class="card-img-top" alt="${course.name}">
        <div class="card-body">
          <h5 class="card-title">${course.name}</h5>
          <p class="card-text">${course.description.slice(0, 200)}........</p>
        </div>
        <div class="card-button d-flex justify-content-center">
          <a class="enroll" href="${course.id}" target="_blank">Enroll Now</a>
        </div>
      </div>
    `;

    parent.appendChild(courseDiv);
  });
};

// Fetch and display courses when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayCourses);
