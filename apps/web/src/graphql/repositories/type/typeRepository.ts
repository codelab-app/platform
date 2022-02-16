import { Field, InterfaceTypeEdge } from '@codelab/shared/abstract/codegen-v2'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { throwIfNullish } from '@codelab/shared/utils'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { first, map, tap } from 'rxjs/operators'
import connectFieldCypher from './connectField.cypher'
import disconnectFieldCypher from './disconnectField.cypher'
import getFieldCypher from './getField.cypher'
import getTypeByIdCypher from './getTypeById.cypher'
import isTypeDescendantOfCypher from './isTypeDescendantOf.cypher'

export interface GetTypeByIdResponse {
  id: string
  name: string
}

export interface DisconnectFieldResponse {
  deletedEdgesCount: number
}

export const typeRepository = {
  // It's easier to just do it in cypher than try and peace together all XType.find() calls
  getTypeById: (
    txn: RxTransaction,
    typeId: string,
  ): Observable<Maybe<GetTypeByIdResponse>> =>
    txn
      .run(getTypeByIdCypher, { typeId })
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('type') as Maybe<GetTypeByIdResponse>),
      ),

  connectField: (
    txn: RxTransaction,
    interfaceTypeId: string,
    targetTypeId: string,
    field: Field,
  ): Observable<InterfaceTypeEdge> =>
    txn
      .run(connectFieldCypher, { interfaceTypeId, targetTypeId, field })
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('field') as Nullish<InterfaceTypeEdge>),
        throwIfNullish(() => new Error('Could not create field')),
      ),

  /**
   * Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId)
   * at any level of nesting. Useful for checking for recursion
   * */
  isTypeDescendantOf: (
    txn: RxTransaction,
    parentTypeId: string,
    descendantTypeId: string,
  ): Observable<boolean> =>
    txn
      .run(isTypeDescendantOfCypher, { parentTypeId, descendantTypeId })
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => !!r?.get('isDescendant')),
      ),

  disconnectField: (
    txn: RxTransaction,
    interfaceId: string,
    key: string,
  ): Observable<DisconnectFieldResponse> =>
    txn
      .run(disconnectFieldCypher, { interfaceId, key })
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => ({ deletedEdgesCount: r?.get('deletedEdgesCount') ?? 0 })),
        tap((r) => console.log(`deleted edges: ${r.deletedEdgesCount}`)),
      ),

  getField: (
    txn: RxTransaction,
    interfaceId: string,
    key: string,
  ): Observable<Maybe<Field>> =>
    txn
      .run(getFieldCypher, { interfaceId, key })
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('field') ?? (undefined as Maybe<Field>)),
      ),
}
