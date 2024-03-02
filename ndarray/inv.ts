import { Matrix } from "./types.ts";
import { eye } from "./create.ts";

/** matrix inversion using gaussian elimination */
export const inv = <N extends number>(
  m: Matrix<[N, N]>,
): Matrix<[N, N]> | null => {
  // number of rows / columns
  const n: N = m.shape[0];
  // clone `m` to avoid inplace modification
  const a = structuredClone(m);
  // the result matrix r
  const r = eye(n);

  // major
  for (let i = 0; i < n; i++) {
    // a_ii == 0 => pivoting
    pivot: if (a.data[i * n + i] == 0) {
      for (let j = i + 1; j < n; j++) {
        if (a.data[j * n + i] != 0) {
          // swap row i and row j
          let tmp;
          for (let k = 0; k < n; k++) {
            // of matrix A
            tmp = a.data[i * n + k];
            a.data[i * n + k] = a.data[j * n + k];
            a.data[j * n + k] = tmp;
            // of matrix R
            tmp = r.data[i * n + k];
            r.data[i * n + k] = r.data[j * n + k];
            r.data[j * n + k] = tmp;
          }
          break pivot;
        }
      }
      // if cannot pivot => no inverse
      return null;
    }
    // normalize row i
    const l = a.data[i * n + i];
    for (let k = 0; k < n; k ++) {
      // of matrix a
      if (k >= i) a.data[i * n + k] /= l;
      // of matrix r
      r.data[i * n + k] /= l;
    }
    // elimination major
    for (let j = i + 1; j < n; j++) {
      if (a.data[j * n + i] == 0) continue;
      const l = a.data[j * n + i];
      for (let k = i; k < n; k++) {
        // of matrix a
        if (k >= i) a.data[j * n + k] -= l * a.data[i * n + k];
        // of matrix r
        r.data[j * n + k] -= l * r.data[i * n + k];
      }
    }
  }
  // elimination minor
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      const l = a.data[j * n + i];
      a.data[j * n + i] = 0;
      for (let k = 0; k < n; k++) {
        r.data[j * n + k] -= l * r.data[i * n + k];
      }
    }
  }
  return r;
};
