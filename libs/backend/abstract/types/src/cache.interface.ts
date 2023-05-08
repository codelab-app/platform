export interface ITTLCache<TKey extends number | string | symbol, TValue> {
  get(key: TKey): TValue | undefined
  set(key: TKey, value: TValue): void
}
