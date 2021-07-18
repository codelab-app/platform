export type GetByIdFunction<T> = (id: string) => T

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<JsonValue>
  | JsonObject

export interface JsonObject {
  [key: string]: JsonValue
}

export interface JsonKeyValuePair {
  key: string
  value: JsonValue
}
