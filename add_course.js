const addCourse = (event) => {
    event.preventDefault();

    const form = document.getElementById("addCourseForm");
    const formData = new FormData(form);

    fetch("http://127.0.0.1:8000/Course/list/", {
        method: "POST",
        headers: {
            // "Authorization": `Bearer ${token}`, // if using token
        },
        body: formData,  // Send form data as 'multipart/form-data'
    })
        .then((res) => {
            if (!res.ok) {
                // If response is not OK, attempt to read as text (HTML error page)
                return res.text().then((text) => {
                    throw new Error(text);
                });
            }
            return res.json();
        })
        .then((data) => {
            console.log("Course added:", data);
            alert("Course added successfully");
            form.reset();
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(`Error adding course: ${error.message}`);
        });
};




// hbsdjhbsd










// fetch("http://127.0.0.1:8000/Course/list/")
//     .then((res) => res.json())
//     .then((data) => {
//         const course = {
//             courseId: data.map((course) => course.id)
//         };

//         // Process each course ID
//         course.courseId.forEach((courseId) => {
//             console.log(`Processing Course ID: ${courseId}`);
//             editCourse(courseId);
//         });
//     })
//     .catch((error) => {
//         console.error("Error fetching courses:", error);
//     });
// Edit Course Functionality
const editCourse = (courseId) => {
    // Fetch course details
    if (!courseId) {
        console.error("Invalid Course ID:", courseId);
        return;
    }
    fetch(`http://127.0.0.1:8000/Course/list/${courseId}/`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((course) => {
            // Populate form fields for editing
            document.getElementById("name").value = course.name;
            document.getElementById("description").value = course.description;
            document.getElementById("month").value = course.month;
            document.getElementById("Course_fee").value = course.Course_fee;

            // Handle form submission for update
            const form = document.getElementById("editCourseForm");
            const formData = new FormData(form);

            fetch(`http://127.0.0.1:8000/Course/list/${courseId}/`, {
                method: "PUT",
                body: formData,
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.text().then((text) => {
                            throw new Error(text);
                        });
                    }
                    return res.json();
                })
                .then((data) => {
                    // alert("Course updated successfully!");
                    console.log("Updated Course:", data);
                })
                .catch((error) => {
                    console.error("Error updating course:", error);
                    alert(`Failed to update course: ${error.message}`);
                });
        });
};
document.getElementById("saveButton").addEventListener("click", function () {
    const courseId = new URLSearchParams(window.location.search).get("id"); // Fetch course ID from URL
    const form = document.getElementById("editCourseForm");
    const formData = new FormData(form);

    fetch(`http://127.0.0.1:8000/Course/list/${courseId}/`, {
        method: "PUT",
        body: formData,
        headers: {
            // Add token if required
            // "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
        .then((res) => {
            if (!res.ok) {
                return res.text().then((text) => {
                    throw new Error(text);
                });
            }
            return res.json();
        })
        .then((data) => {
            alert("Course updated successfully!");
            console.log("Updated Course:", data);
            // window.location.href = ""; // Redirect to course list or any other page
        })
        .catch((error) => {
            console.error("Error updating course:", error);
            alert(`Failed to update course: ${error.message}`);
        });
});