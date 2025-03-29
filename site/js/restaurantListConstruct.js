"use strict";

import {
  getRestaurants,
  getDailyMenu,
  getWeeklyMenu,
} from "./restaurantGets.js";

const accordion = document.querySelector(".accordion");

export function constructRestaurantList(restaurants) {
  for (let restaurant of restaurants) {
    // details is the root of one restaurant listing
    const details = document.createElement("details");
    let contentLoaded = false; // Flag to track if content has been loaded

    details.addEventListener("toggle", async () => {
      // Only load content when opening and if not already loaded
      if (details.open && !contentLoaded) {
        // construct restaurant details + menu according to options
        const container = document.createElement("div");
        const restaurantDetailsDiv = document.createElement("div");
        const foodListDiv = document.createElement("div");
        restaurantDetailsDiv.classList.add("detailsdivs");
        foodListDiv.classList.add("detailsdivs");

        const weeklyMenu = await getWeeklyMenu(restaurant._id);

        for (let item of weeklyMenu["courses"]) {
          const p = document.createElement("p");
          p.innerText = item.name;
          foodListDiv.appendChild(p);
        }

        container.append(restaurantDetailsDiv, foodListDiv);
        details.append(container);
        contentLoaded = true; // Mark content as loaded
      }
    });

    const summary = document.createElement("summary");
    summary.innerText = restaurant.name;

    details.append(summary);
    accordion.appendChild(details);
  }
}
