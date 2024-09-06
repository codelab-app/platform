export type WithStyleProp<T extends object> = T & {
  style?: Record<string, number | string>
}
