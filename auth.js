const handleRegister = (event) => {
  event.preventDefault();
  const form = document.getElementById("register-form");
  const formData = new FormData(form);

  const registerData = {
    username: formData.get("username"),
    first_name: formData.get("FirstName"),
    last_name: formData.get("LastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirmPassword"),
  };

  console.log("Registration data", registerData);

  fetch("http://127.0.0.1:8000/Student/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  })
    .then((res) => {
      alert(
        "Registration Successful. Please check your email for a confirmation."
      );
      window.location.href = "./login.html";
    })
    .catch((error) => console.log("Registration Error", error));
};




// login

const handleLogin = (event) => {
  event.preventDefault();
  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  const loginData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  fetch("http://127.0.0.1:8000/Student/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Login failed");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log("Auth token received:", data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user_id", data.user_id);
      alert("Login Successful!");
      window.location.href = "./index.html";
    })
    .catch((err) => {
      console.log("Login error", err.message);
      alert("Login failed: " + err.message);
    });
};


// const navelement = document.getElementById('auth');

// const token = localStorage.getItem('authToken');
// console.log(token);
// if (token) {
//   navelement.innerHTML += `
                // <li class="">
                //   <h5><a class="nav-link" href="index.html" onclick="handleLogout(event)">Logout</a></h5>
                // </li>
                // <li class="">
                //   <h5><a class="nav-link" href="Teacher_deshboard.html">profile</a></h5>
                // </li>
// `
// }
// else {
//   navelement.innerHTML += `
            // <li class="login">
            //   <h5><a class="nav-link" href="login.html">sign in</a></h5>
            // </li>
            // <li class="nav-item">
            //     <h5><a class="nav-link" href="registetion.html">sign up</a></h5>
            // </li>
// `
// }


const handleLogout = (event) => {
  event.preventDefault();
  const token = localStorage.getItem("authToken");
  console.log(token);

  fetch("http://127.0.0.1:8000/Student/logout/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user_id");
      window.location.href = "index.html";
    });
};


