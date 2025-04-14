"use strict";

import { verifyToken } from "./utils.js";

export async function checkLoginState() {
  const username = document.querySelector(".username");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    username.innerText = "Not logged in.";
    return;
  }

  try {
    // Verify token and get user data
    const userData = await verifyToken(token);

    // Populate form with user data
    username.innerText = "Welcome " + userData.username + "!";

    const navbar = document.querySelector(".navbar");

    const logoutButton = document.createElement("a");
    logoutButton.innerText = "Logout";
    logoutButton.classList.add("navbarbutton");
    navbar.appendChild(logoutButton);
    logoutButton.addEventListener("click", async () => {
      localStorage.removeItem("token");
      username.innerText = "Not logged in.";
      window.location.reload();
    });
  } catch (error) {
    username.innerText = "Authentication failed. Please log in again.";
    console.error("Error:", error);
  }
}
