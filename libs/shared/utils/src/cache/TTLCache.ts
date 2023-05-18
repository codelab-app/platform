export class TTLCache<TKey extends number | string | symbol, TValue> {
  private cache: Map<TKey, { value: TValue; expiresAt: number }> = new Map()

  constructor(private ttl: number) {}

  set(key: TKey, value: TValue) {
    this.cache.set(key, {
      expiresAt: Date.now() + this.ttl,
      value,
    })
  }

  get(key: TKey): TValue | undefined {
    const entry = this.cache.get(key)

    if (entry && Date.now() < entry.expiresAt) {
      return entry.value
    }

    this.cache.delete(key)

    return undefined
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}
