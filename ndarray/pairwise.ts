import { NdArray } from "./types.ts";

export const pairwise = <T>(fn: (a: T, b: T) => T) =>
<Sh extends number[]>(
  a: NdArray<T, Sh>,
  b: NdArray<T, Sh>,
): NdArray<T, Sh> => {
  const length = a.data.length;
  const aData = a.data;
  const bData = b.data;
  // deno-lint-ignore no-explicit-any
  const data = new Array(length) as any;
  for (let i = 0; i < length; i++) {
    data[i] = fn(aData[i], bData[i]);
  }
  return { shape: a.shape, data };
};

export const add = pairwise((a: number, b: number) => a + b);
export const sub = pairwise((a: number, b: number) => a - b);
export const mul = pairwise((a: number, b: number) => a * b);
export const div = pairwise((a: number, b: number) => a / b);
export const pow = <Sh extends number[]>(
  a: NdArray<number, Sh>,
  b: number,
) => ({
  shape: a.shape,
  data: a.data.map((x) => Math.pow(x, b)),
});
