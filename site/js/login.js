"use strict";

const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dator = {
    username: form.username.value,
    password: form.password.value,
  };

  const response = await fetch(
    "https://media2.edu.metropolia.fi/restaurant/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dator),
    }
  );

  const data = await response.json();

  if (response.ok) {
    console.log("Login successful!");
    // Optionally redirect or show a success message
    console.log("token", data.token);
    localStorage.setItem("token", data.token);
    window.location.href = "index.html"; // Redirect to the main page after login
  } else {
    alert("Login failed. Please check your credentials.");
    console.error("Login failed.");
    // Optionally show an error message
  }
});

console.log(form);
