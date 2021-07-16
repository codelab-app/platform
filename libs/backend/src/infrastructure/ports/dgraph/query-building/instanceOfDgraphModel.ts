import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphEntity } from '../interfaces'

/**
 * Goes through all of the dgraph.type strings and returns true if any of them matches the provided entity type
 */
export const instanceOfDgraphModel = <
  TActual extends Array<DgraphEntityType> | DgraphEntityType,
  TExpected extends DgraphEntityType,
>(
  object: DgraphEntity<TActual>,
  entityType: TExpected,
): TActual extends TExpected
  ? true
  : TActual extends Array<infer TItem>
  ? TItem extends TExpected
    ? true
    : false
  : false => {
  return !!object['dgraph.type']?.find((t: string) => t === entityType) as any
}
