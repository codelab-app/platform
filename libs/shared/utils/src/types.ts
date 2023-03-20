/* eslint-disable @typescript-eslint/no-explicit-any */

// We need to use this version of Omit as it's distributive (Will preserve unions)
export type DistributiveMerge<T, U> = T extends any ? T & U : never
