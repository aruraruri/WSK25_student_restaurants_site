"use strict";

import { verifyToken } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const authMessage = document.getElementById("auth-message");
  const profileForm = document.getElementById("profile-form");
  const saveBtn = document.getElementById("save-btn");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    authMessage.textContent = "No authentication token found. Please log in.";
    authMessage.classList.add("error");
    profileForm.classList.add("hidden");
    return;
  }

  try {
    // Verify token and get user data
    const userData = await verifyToken(token);

    // Populate form with user data
    document.getElementById("username").value = userData.username;
    document.getElementById("email").value = userData.email;

    authMessage.textContent = `Welcome, ${userData.username}!`;
    authMessage.classList.add("success");
    profileForm.classList.remove("hidden");
  } catch (error) {
    authMessage.textContent = "Authentication failed. Please log in again.";
    authMessage.classList.add("error");
    profileForm.classList.add("hidden");
    console.error("Error:", error);
  }

  // Handle form submission
  profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    saveBtn.disabled = true;

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      saveBtn.disabled = false;
      return;
    }

    try {
      const updateData = { username, email };
      if (password) updateData.password = password;

      const response = await updateUser(updateData, token);

      if (response.ok) {
        alert("Profile updated successfully!");
        // Update token if it was refreshed
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Update error:", error);
    } finally {
      saveBtn.disabled = false;
    }
  });
});

async function updateUser(data, token) {
  const response = await fetch(
    "https://media2.edu.metropolia.fi/restaurant/api/v1/users",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return response;
}
