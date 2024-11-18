const addCourse = (event) => {
    event.preventDefault();
    const form = document.getElementById("addCourseForm");
    const formData = new FormData(form);
    fetch("http://127.0.0.1:8000/Course/list/", {
        method: "POST",
        headers: {
            // "Authorization": `Bearer ${token}`, // if using token
        },
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
            console.log("Course added:", data);
            alert("Course added successfully");
            form.reset();
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(`Course added unsuccessfully`);
        });
};

