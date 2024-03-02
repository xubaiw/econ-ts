import { Multiply } from "npm:ts-arithmetic";

export type Product<Xs extends number[]> = Xs extends
  [infer Head, ...infer Tail]
  ? (Head extends number
    ? (Tail extends number[] ? Multiply<Head, Product<Tail>> : never)
    : never)
  : 1;

export type SizedArray<T, N extends number> = Array<T> & { length: N };

export type NdArray<T, Sh extends number[]> = {
  shape: Sh;
  data: SizedArray<T, Product<Sh>>;
};

export type Index<Sh extends number[]> = Sh extends [infer Head, ...infer Tail]
  ? (Head extends number
    ? (Tail extends number[] ? [number, ...Index<Tail>] : never)
    : never)
  : [];

/** Mathmatics matrix using number type */
export type Matrix<Sh extends number[]> = NdArray<number, Sh>;


