import { Field, InterfaceTypeEdge } from '@codelab/shared/abstract/codegen-v2'
import { IType, ITypeGraph, TypeKind } from '@codelab/shared/abstract/core'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { throwIfNullish } from '@codelab/shared/utils'
import { omit } from 'lodash'
import { RxTransaction } from 'neo4j-driver'
import { Observable, of } from 'rxjs'
import { first, map, tap } from 'rxjs/operators'
import connectFieldCypher from './connectField.cypher'
import disconnectFieldCypher from './disconnectField.cypher'
import getFieldCypher from './getField.cypher'
import getTypeByIdCypher from './getTypeById.cypher'
import getTypeGraphCypher from './getTypeGraph.cypher'
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

  // Notes on the cypher query, since commenting inside it gives syntax errors if parsed here:
  // __resolveType is needed for graphql to recognize the correct concrete type
  // I'm not sure why it doesn't do it automatically, but this seems to work well for now
  // We collect two 'types' of edges - 1 are the interface fields, which need the field properties.
  // Interface fields result in InterfaceTypeEdge graphql type.
  // And then there's the rest which don't have it. Here we filter out the interface fields and then concatenate them with the rest. They result in a Edge graphql type.
  getTypeGraph: (txn: RxTransaction, rootIds: Array<string>) =>
    txn
      .run(`MATCH (this) WHERE this.id IN $rootIds  ${getTypeGraphCypher}`, {
        rootIds,
      })
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('graph') as Maybe<ITypeGraph>),
      ),

  // The cypher here must be dynamic because we can't have the label as parameter
  // https://community.neo4j.com/t/having-a-label-as-a-parameter-in-a-cypher-query-efficiently/26555/4
  createTypes: (txn: RxTransaction, types: Array<IType>) => {
    if (types.length === 0) {
      return of([])
    }

    const params: Record<string, any> = {}
    let n = 1
    const nodeKeys: Array<string> = []

    let cypher = types.reduce((cypherAgg, type) => {
      n++

      const paramKey = `props${n}`
      params[paramKey] = omit(type, ['typeKind', 'id', 'owner', 'ownerId']) // assign the type array to a parameter we will pass later to the query

      // sanitize labels, since they can be passed in from the user
      if (!allowedLabels.has(type.typeKind as TypeKind)) {
        throw new Error(
          `Invalid type kind: ${type.typeKind} is not in allowed ones: ${allowedLabels}`,
        )
      }

      const nodeKey = `node${n}` // assign a specific node variable key so we can extract them all at the end and return them
      nodeKeys.push(nodeKey)

      const ownerCy = type.owner?.id
        ? `CREATE (${nodeKey})-[r:OWNS_TYPE]->(b:User {id: '${type.owner.id}'})`
        : ''

      return `${cypherAgg}
      CREATE (${nodeKey}:${type.typeKind} $${paramKey})
      ${ownerCy}`
    }, '')

    cypher += `RETURN [${nodeKeys.join(',')}] as nodes`

    return txn
      .run(`cypher`)
      .records()
      .pipe(map((r) => r?.get('nodes') as Array<IType>))
  },
}

const allowedLabels = new Set(Object.values(TypeKind))
