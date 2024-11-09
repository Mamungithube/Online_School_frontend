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




