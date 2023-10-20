// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never
