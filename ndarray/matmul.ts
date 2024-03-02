import { Matrix } from "./types.ts";
import { fill } from "./create.ts";

/** matrix multiplication */
export const matmul = <M extends number, N extends number, L extends number>(
  a: Matrix<[M, L]>,
  b: Matrix<[L, N]>,
): Matrix<[M, N]> => {
  const [m, l] = a.shape;
  const [, n] = b.shape;
  const c = fill(0, [m, n] as const);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < l; k++) {
        // c_ij += a_ik * b_kj
        c.data[i * n + j] += a.data[i * l + k] * b.data[k * n + j];
      }
    }
  }
  return c;
};
