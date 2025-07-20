export type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never

export type DistributivePick<T, K extends keyof T> = T extends unknown
  ? Pick<T, K>
  : never
