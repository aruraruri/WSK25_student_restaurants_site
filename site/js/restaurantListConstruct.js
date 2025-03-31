"use strict";

import {
  getRestaurants,
  getDailyMenu,
  getWeeklyMenu,
} from "./restaurantGets.js";

import { main } from "./main.js";

const accordion = document.querySelector(".accordion");

const dailyWeeklySwitch = document.querySelector("input[type='checkbox']");
dailyWeeklySwitch.addEventListener("click", () => closeDetails());

const cityFilter = document.querySelector(".custom-select > select");

// reusable close details for different event listeners
function closeDetails() {
  const allDetails = document.querySelectorAll("details");
  for (let detail of allDetails) {
    detail.open = false;
    console.log("closing details");
  }
}

export function constructRestaurantList(restaurants) {
  // empty accordion/restaurant listing for new round
  accordion.innerHTML = "";

  for (let restaurant of restaurants) {
    const filter = cityFilter.value;
    if (filter == restaurant.city || filter == -1) {
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
          constructRestaurantInfo(restaurant, restaurantDetailsDiv);
        }
      });

      const summary = document.createElement("summary");
      summary.innerText = restaurant.name;
      details.append(summary);
      accordion.appendChild(details);
    }
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

function constructRestaurantInfo(restaurant, appendToElem) {
  const pAddress = document.createElement("p");
  pAddress.innerText = restaurant.address ? restaurant.address : "";
  const pCity = document.createElement("p");
  pCity.innerText = restaurant.city ? restaurant.city : "";
  const pPostal = document.createElement("p");
  pPostal.innerText = restaurant.postal ? restaurant.postal : "";
  const pPhone = document.createElement("p");
  pPhone.innerText = restaurant.phone ? restaurant.phone : "";
  console.log(restaurant);

  appendToElem.append(pAddress, pCity, pPostal, pPhone);
}

export function populateCityFilter(restaurants) {
  // builds city filter list inside the custom-select element
  let cityList = [];
  restaurants.forEach((restaurant) => {
    if (!cityList.includes(restaurant.city)) {
      cityList.push(restaurant.city);
    }
  });

  for (let i = 0; i < cityList.length; i++) {
    const selectOption = document.createElement("option");
    selectOption.value = cityList[i];
    selectOption.innerText = cityList[i];
    cityFilter.appendChild(selectOption);
  }

  // add click option to collapse details
  const cityFilterOptions = document.querySelectorAll("option");
  for (let option of cityFilterOptions) {
    option.addEventListener("click", () => {
      closeDetails();
      main();
    });
    console.log(option);
  }
}
