import { ols } from "./ols.ts";

const res = ols(
  { shape: [10], data: [1.9, 2.1, 3.4, 4.2, 5.1, 6.5, 7.8, 8.4, 9.0, 11] },
  {
    shape: [10, 2],
    data: [1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9, 1, 10],
  },
);
console.log(res);
