"use strict";

export async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
  }
}

export async function verifyToken(token) {
  const response = await fetch(
    `https://media2.edu.metropolia.fi/restaurant/api/v1/users/token`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Token verification failed");
  }

  return await response.json();
}
