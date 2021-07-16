export type UnboxItem<P> = P extends
  | Array<infer T | null | undefined>
  | null
  | undefined
  ? T
  : unknown
