"use strict";

import { checkLoginState } from "./loginState.js";
import { getRestaurants } from "./restaurantGets.js";
import {
  constructRestaurantList,
  populateCityFilter,
} from "./restaurantListConstruct.js";

async function main() {
  await checkLoginState();
  const restaurants = await getRestaurants();
  constructRestaurantList(restaurants);
  populateCityFilter(restaurants);
}

main();

export { main };
