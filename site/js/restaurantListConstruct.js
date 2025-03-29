"use strict";

import {
  getRestaurants,
  getDailyMenu,
  getWeeklyMenu,
} from "./restaurantGets.js";

const accordion = document.querySelector(".accordion");

export function constructRestaurantList(restaurants) {
  for (let restaurant of restaurants) {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.innerText = restaurant.name;
    details.append(summary);
    accordion.appendChild(details);
  }
}
