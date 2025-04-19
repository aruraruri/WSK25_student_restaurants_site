"use strict";

const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dator = {
    username: form.username.value,
    password: form.password.value,
    email: form.email.value,
  };

  //   const formData = new FormData(form);
  //   const data = Object.fromEntries(formData.entries());

  const response = await fetch(
    "https://media2.edu.metropolia.fi/restaurant/api/v1/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dator),
    }
  );

  if (response.ok) {
    console.log("Registration successful!");
    // redirect to login
    window.location.href = "login.html"; // Redirect to the login page after registration
  } else {
    console.error("Registration failed.");
    // Optionally show an error message
  }
});

console.log(form);
