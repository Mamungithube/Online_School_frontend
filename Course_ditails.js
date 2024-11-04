document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("id");

    // Check if courseId exists
    if (!courseId) {
        console.error("No course ID found in URL");
        return;
    }

    const token = localStorage.getItem("authToken");
    fetch(`http://127.0.0.1:8000/Course/Course/${courseId}/`, {
        headers: {
            'Authorization': `token ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(course => {
        document.getElementById("course-name").textContent = course.name;
        document.getElementById("course-duration").textContent = `${course.month} Month`;
        document.getElementById("course-fee").textContent = course.Course_fee;
        document.getElementById("course-description").textContent = course.description;
        document.getElementById("course-image").src = `http://127.0.0.1:8000${course.image}`;

    })
    .catch(error => console.error("Error fetching data:", error));
});
