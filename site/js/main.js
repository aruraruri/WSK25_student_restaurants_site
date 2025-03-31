"use strict";

import { getRestaurants } from "./restaurantGets.js";
import {
  constructRestaurantList,
  populateCityFilter,
} from "./restaurantListConstruct.js";

async function main() {
  const restaurants = await getRestaurants();
  constructRestaurantList(restaurants);
  populateCityFilter(restaurants);
}

main();
