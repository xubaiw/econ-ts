import * as np from "../ndarray/mod.ts";

export type OlsReport<P extends number> = {
  beta: np.Matrix<[P, 1]>;
  cov: np.Matrix<[P, P]>;
};

export const ols = <N extends number, P extends number>(
  y: np.Matrix<[N]>,
  x: np.Matrix<[N, P]>,
): OlsReport<P> | null => {
  const yResized: np.Matrix<[N, 1]> = { data: y.data, shape: [y.shape[0], 1] };
  const xT = np.transpose(x);
  const xSpan = np.matmul(xT, x);
  const xSpanInv = np.inv(xSpan);
  if (!xSpanInv) return null;
  const xSpanInv_xT = np.matmul(xSpanInv, xT);
  const betaResized = np.matmul(xSpanInv_xT, yResized);
  // deno-lint-ignore no-explicit-any
  const beta = { ...betaResized, shape: betaResized.shape[0] } as any;
  const yPred = np.matmul(x, betaResized);
  const e = np.sub(yResized, yPred);
  const sse = np.pow(e, 2).data.reduce((a, b) => a + b);
  const ddof = y.shape[0] - x.shape[1];
  const mse = sse / ddof;
  const cov = {
    shape: xSpanInv.shape,
    // deno-lint-ignore no-explicit-any
    data: xSpanInv.data.map((x) => x * mse) as any,
  };
  return { beta, cov };
};


