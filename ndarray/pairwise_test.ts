import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts";
import { Matrix } from "./types.ts";
import { add } from "./pairwise.ts";

type TestMat = Matrix<[2, 3]>;

Deno.test("pairwise", () => {
  const shape = [2, 3] as [2, 3];
  const a: TestMat = { shape, data: [1, 2, 3, 4, 5, 6] };
  const b: TestMat = { shape, data: [0, 1, 0, 1, 0, 1] };
  const c = add(a, b);
  assertEquals(c, { shape, data: [1, 3, 3, 5, 5, 7] });
});
