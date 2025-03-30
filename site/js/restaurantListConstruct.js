"use strict";

import {
  getRestaurants,
  getDailyMenu,
  getWeeklyMenu,
} from "./restaurantGets.js";

const accordion = document.querySelector(".accordion");

const dailyWeeklySwitch = document.querySelector("input[type='checkbox']");
dailyWeeklySwitch.addEventListener("click", () => {
  const allDetails = document.querySelectorAll("details");
  for (let detail of allDetails) {
    detail.open = false;
  }
});

export function constructRestaurantList(restaurants) {
  for (let restaurant of restaurants) {
    const details = document.createElement("details");
    let container, restaurantDetailsDiv, foodListDiv;

    details.addEventListener("toggle", async () => {
      // Only proceed if details is opening (not closing)
      if (details.open) {
        // Create elements if they don't exist yet
        if (!container) {
          container = document.createElement("div");
          restaurantDetailsDiv = document.createElement("div");
          foodListDiv = document.createElement("div");
          restaurantDetailsDiv.classList.add("detailsdivs");
          foodListDiv.classList.add("detailsdivs");
          container.append(restaurantDetailsDiv, foodListDiv);
          details.append(container);
        }

        // Clear previous content
        foodListDiv.innerHTML = "";
        restaurantDetailsDiv.innerHTML = "";

        // Load new content
        if (dailyWeeklySwitch.checked) {
          constructWeeklyMenuList(
            await getWeeklyMenu(restaurant._id),
            foodListDiv
          );
        } else {
          constructDailyMenuList(
            await getDailyMenu(restaurant._id),
            foodListDiv
          );
        }
      }
    });

    const summary = document.createElement("summary");
    summary.innerText = restaurant.name;
    details.append(summary);
    accordion.appendChild(details);
  }
}

function constructDailyMenuList(menu, appendToElem) {
  // make heading for date
  const dayh3 = document.createElement("h3");
  dayh3.innerText = "Today:";
  appendToElem.appendChild(dayh3);

  const ul = document.createElement("ul");
  ul.classList.add("restaurantslist");

  for (let item of menu["courses"]) {
    const li = document.createElement("li");
    li.innerText = `${item.name}, hinta: ${
      item.price ? item.price : "N/A"
    }, dieetit: ${item.diets}`;
    ul.appendChild(li);
  }
  appendToElem.appendChild(ul);
}

function constructWeeklyMenuList(menu, appendToElem) {
  for (let day of menu["days"]) {
    // make heading for date
    const dayh3 = document.createElement("h3");
    dayh3.innerText = day["date"];
    appendToElem.appendChild(dayh3);

    const ul = document.createElement("ul");
    ul.classList.add("restaurantslist");

    for (let item of day["courses"]) {
      // make li for a course
      const li = document.createElement("li");
      li.innerText = `${item.name}, hinta: ${
        item.price ? item.price : "N/A"
      }, dieetit: ${item.diets}`;
      ul.appendChild(li);
    }
    appendToElem.appendChild(ul);
  }
}
