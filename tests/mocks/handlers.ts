import { http, HttpResponse } from "msw";

import { CoffeeStoreType } from "@/types";

export const handlers = [
  http.get("/api/get-coffee-stores-by-location", () => {
    const coffeeStores: Array<CoffeeStoreType> = [
      {
        id: "1",
        name: "Starbucks",
        address: "123 Yonge",
        imgUrl: "https://via.placeholder.com/150",
        voting: 0,
      },
    ];
    console.log("MSW route hit", {
      url: "/api/get-coffee-stores-by-location",
      response: coffeeStores,
    });
    return HttpResponse.json(coffeeStores);
  }),
];
