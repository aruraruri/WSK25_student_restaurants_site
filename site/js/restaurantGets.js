"use strict";

import { fetchData } from "./utils.js";

const restaurantsUrl =
  "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

const dailyMenuUrl =
  "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/";

const weeklyMenuUrl =
  "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/";

export async function getRestaurants() {
  const data = await fetchData(restaurantsUrl);
  console.log(data);
  return data;
}

export async function getDailyMenu(restaurantId) {
  const data = await fetchData(dailyMenuUrl + restaurantId + "/fi");
  console.log(dailyMenuUrl + restaurantId + "/fi");
  console.log(data);
  return data;
}

export async function getWeeklyMenu(restaurantId) {
  const data = await fetchData(weeklyMenuUrl + restaurantId + "/fi");
  console.log(weeklyMenuUrl + restaurantId + "/fi");
  console.log(data);
  return data;
}
