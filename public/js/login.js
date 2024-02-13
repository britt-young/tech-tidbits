// Login function for HTML 'login' button
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert("Failed to log in");
    }
  }
};
// Event listener for login button, executes loginFormHandler function when clicked
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

// Signup function for HTML 'signup' button, authenticates user input and sends POST request to server
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const confirmPassword = document
    .querySelector("#confirmPass-signup")
    .value.trim();
  let alertMessage = "";

  if (!name) {
    alertMessage += "Missing name\n";
  }
  if (!email) {
    alertMessage += "Missing email\n";
  }
  if (!password) {
    alertMessage += "Missing password\n";
  }
  if (password.length < 8) {
    alertMessage += "Password is smaller than 8 characters\n";
  }
  if (!confirmPassword || password !== confirmPassword) {
    alertMessage += "Passwords do not match\n";
  }

  if (alertMessage.length !== 0) {
    alert(alertMessage);
  } else if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert("Sign up failed. Please try again.");
    }
  }
};
// Event listener for signup button, executes signupFormHandler function when clicked
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

  // Event listener for login button, executes loginFormHandler function when clicked
  document
            .querySelector('.login-form')
            .addEventListener('submit', loginFormHandler);