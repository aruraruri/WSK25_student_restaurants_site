"use strict";

import { getRestaurants } from "./restaurantGets.js";
import { constructRestaurantList } from "./restaurantListConstruct.js";

async function main() {
  constructRestaurantList(await getRestaurants());
}

main();
