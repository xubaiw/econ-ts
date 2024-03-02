import { NdArray, Product, SizedArray, Matrix } from "./types.ts";
export const fill = <T, Sh extends number[]>(
  x: T,
  shape: Sh,
): NdArray<T, Sh> => {
  const data = new Array(shape.reduce((a, b) => a * b)) as SizedArray<
    T,
    Product<Sh>
  >;
  data.fill(x);
  return { shape, data };
};

export const eye = <N extends number>(n: N): Matrix<[N, N]> => {
  const a = fill(0, [n, n] as const);
  for (let i = 0; i < n; i++) {
    a.data[i * n + i] = 1;
  }
  return a;
};
