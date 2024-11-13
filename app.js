let coursesData = []; // Store courses globally for filtering

const fetchAndDisplayCourses = () => {
  fetch("http://127.0.0.1:8000/Course/list/")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      coursesData = data;
      displayCourses(coursesData);
      console.log("Fetched Data:", coursesData);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
};

const displayCourses = (courses) => {
  const parent = document.getElementById("courses");
  if (!parent) {
    console.error("Parent element not found");
    return;
  }
  parent.innerHTML = '';

  courses.forEach(course => {
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("course-card");

    courseDiv.innerHTML = `
    <div class="card" style="height: 500px;">
        <img src="${course.image}" class="card-img-top" alt="${course.name}">
        <div class="card-body">
            <h5 class="card-title">${course.name}</h5>
            <p class="card-text">${course.description.slice(0, 180)}...</p>
        </div>
        <div class="card-button d-flex justify-content-center">
            <a class="enroll" href="Course_ditails.html?id=${course.id}">View Ditails</a>
        </div>
    </div>
`;


    parent.appendChild(courseDiv);
  });
};

// Function to filter courses based on user input
const filterCourses = () => {
  const filterText = document.getElementById("courseFilter").value.toLowerCase();

  // Filter courses based on name or description match
  const filteredCourses = coursesData.filter(course =>
    course.name.toLowerCase().includes(filterText) ||
    course.description.toLowerCase().includes(filterText)
  );

  displayCourses(filteredCourses); // Display filtered courses
};

// Add an event listener to the input field to filter as you type
document.getElementById("courseFilter").addEventListener("input", filterCourses);

// Fetch and display courses when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayCourses);
