export type DataFrame<Sc extends Record<string, unknown>> = {
  data: { [key in keyof Sc]: Array<Sc[key]> };
};

export const parseCsv = () => {}
export const toNdArray = () => {};
