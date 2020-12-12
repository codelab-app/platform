export interface Collection<TRecord extends Record<string, any>> {
  data: Array<TRecord> | TRecord
}
