import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts";
import { Matrix } from "./types.ts";
import { matmul } from "./matmul.ts";

Deno.test("matmul", () => {
  const a: Matrix<[2, 3]> = { shape: [2, 3], data: [1, 2, 3, 4, 5, 6] };
  const b: Matrix<[3, 2]> = { shape: [3, 2], data: [1, 2, 3, 4, 5, 6] };
  const c = matmul(a, b);
  assertEquals(c, {shape: [2, 2], data: [22, 28, 49, 64]})
});
