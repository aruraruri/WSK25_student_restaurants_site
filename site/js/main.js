"use strict";

import { checkLoginState } from "./loginState.js";
import { getRestaurants } from "./restaurantGets.js";
import {
  constructRestaurantList,
  populateCityFilter,
} from "./restaurantListConstruct.js";

export async function main() {
  checkLoginState();

  const restaurants = await getRestaurants();
  constructRestaurantList(restaurants);
  populateCityFilter(restaurants);
}

main();
