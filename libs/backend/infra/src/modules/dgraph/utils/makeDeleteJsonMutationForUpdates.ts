/**
 * For matching keys in the entity and dgraph schema, just use a string:
 * Entity: {name?: string}, dgraphSchema: {name?: string}, NullablePredicates = ['name']
 *
 * For non-matching keys, use an array with format [entityKey, dgraphSchemaKey]:
 * Entity: {name?: string}, dgraphSchema: {specialName?: string}, NullablePredicates = [['name', 'specialName']]
 * */
export type NullablePredicates<T> = Array<
  keyof T | string | [keyof T | string, string]
>

/**
 * Goes through all the nullableProperties, and if they are null or undefined
 * in the provided object, it will add them to the deleteJson.
 * The final deleteJson is returned
 *
 * {@see NullablePredicates} for how to construct the predicate array
 */
export const makeDeleteJsonMutationForUpdates = <T extends Record<string, any>>(
  obj: T,
  uid: string,
  nullableProperties: NullablePredicates<T>,
) => {
  if (nullableProperties.length === 0) {
    return undefined
  }

  const deleteJson: Record<string, any> = { uid }
  let count = 0

  for (const nullableKey of nullableProperties) {
    const [sourceKey, targetKey] = Array.isArray(nullableKey)
      ? nullableKey
      : [nullableKey, nullableKey]

    const val = obj[sourceKey]

    if (val === null || val === undefined) {
      ;(deleteJson as any)[targetKey] = null
      count++
    }
  }

  // If we don't have any predicates, it will delete the whole node if we return just { uid }
  if (count === 0) {
    return undefined
  }

  return deleteJson
}
