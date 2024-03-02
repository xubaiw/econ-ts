import { Matrix } from "./types.ts";
import { inv } from "./inv.ts";
import { matmul } from "./matmul.ts";

const a: Matrix<[3, 3]> = {
  shape: [3, 3],
  data: [1, 2, 3, 0, 1, -2, 0, 0, 100],
};
const r = inv(a);
console.log(r);
console.log(matmul(a, r!));
