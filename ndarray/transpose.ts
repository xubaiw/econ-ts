import { Matrix } from "./types.ts";
import { fill } from "./create.ts";

export const transpose = <M extends number, N extends number>(
  a: Matrix<[M, N]>,
): Matrix<[N, M]> => {
  const [m, n] = a.shape;
  const r = fill(0, [n, m] as const);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      r.data[j * n + i] = a.data[i * n + j];
    }
  }
  return r;
};
