import { Field, InterfaceTypeEdge } from '@codelab/shared/abstract/codegen-v2'
import { IType, ITypeGraph, TypeKind } from '@codelab/shared/abstract/core'
import { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { throwIfNullish } from '@codelab/shared/utils'
import { omit } from 'lodash'
import { RxTransaction } from 'neo4j-driver'
import { Observable, of } from 'rxjs'
import { first, map, switchMap, tap } from 'rxjs/operators'
import disconnectFieldCypher from './disconnectField.cypher'
import getAllTypeGraphCypher from './getAllTypeGraph.cypher'
import getFieldCypher from './getField.cypher'
import getTypeByIdCypher from './getTypeById.cypher'
import getTypeByIdsCypher from './getTypeByIds.cypher'
import getTypeGraphCypher from './getTypeGraph.cypher'
import isTypeDescendantOfCypher from './isTypeDescendantOf.cypher'

export interface GetTypeByIdResponse {
  id: string
  name: string
}

export type ITypeKind = TypeKind & {
  EnumTypeValue: 'EnumTypeValue'
}

export type ExtraEdgeCreateArgs = {
  __resolveType: string
  id: string
  source: string
  target: string
}

export type ExtraEdgeCreateResult = {
  source: string
  target: string
}

export const ITypeKind = {
  ...TypeKind,
  EnumTypeValue: 'EnumTypeValue',
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

  getTypeByIds: (
    txn: RxTransaction,
    typeIds: Array<string>,
  ): Observable<Maybe<GetTypeByIdResponse>> =>
    txn
      .run(getTypeByIdsCypher, { typeIds })
      .records()
      .pipe(map((r) => r?.get('types') as Maybe<GetTypeByIdResponse>)),

  // connect field edges
  connectField: (
    txn: RxTransaction,
    interfaceTypeId: string,
    targetTypeId: string,
    field: Field,
  ): Observable<InterfaceTypeEdge> => {
    let cypher = `MATCH
      (interfaceType:InterfaceType {id: $interfaceTypeId}),
      (targetType {id: $targetTypeId})
      WHERE labels(targetType)[0] ENDS WITH 'Type'`

    const fieldKey = field.key
    const fieldInput: any = field
    const keys = Object.keys(field).filter((key) => key != 'id')

    const parameters = keys.reduce(
      (allMergeParams: Array<string>, key: string) => {
        const p = ` r.${key}='${fieldInput[key]}' `
        allMergeParams.push(p)

        return allMergeParams
      },
      [],
    )

    cypher += `
        MERGE (interfaceType)-[r:INTERFACE_FIELD {key: '${fieldKey}'}]->(targetType)
          ON CREATE
            SET
              ${parameters.join(', ')}
          ON MATCH
            SET
              ${parameters.join(', ')}
        `

    cypher += `RETURN apoc.map.merge(properties(r), {source: interfaceType.id, target: targetType.id}) as field`

    return txn
      .run(cypher, { interfaceTypeId, targetTypeId })
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('field') as Nullish<InterfaceTypeEdge>),
        throwIfNullish(() => new Error('Could not create field')),
      )
  },
  // connect extra edges
  connectExtraEdge: (
    txn: RxTransaction,
    input: ExtraEdgeCreateArgs,
  ): Observable<ExtraEdgeCreateResult> => {
    const param = {
      Type: input.__resolveType,
      relId: input.id,
      sourceTypeId: input.source,
      targetTypeId: input.target,
    }

    const cypher = `MATCH
        (sourceType {id: $param.sourceTypeId}),
        (targetType {id: $param.targetTypeId})

      MERGE (sourceType)-[r:${param.Type} {id: $param.relId}]->(targetType)
          ON CREATE
              SET
                  r.id=$param.relId
          ON MATCH
              SET
                  r.id=$param.relId
      
      RETURN {source: sourceType.id, target: targetType.id} as edge`

    return txn
      .run(cypher, { param })
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('edge') as Nullish<ExtraEdgeCreateResult>),
        throwIfNullish(() => new Error('Could not create field')),
      )
  },

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
        // first(() => true, undefined),
        switchMap((r) => of(r?.get('graph') as Maybe<ITypeGraph>)),
      ),

  // get all types graph
  getAllTypesGraph: (txn: RxTransaction) =>
    txn
      .run(`${getAllTypeGraphCypher}`)
      .records()
      .pipe(switchMap((r) => of(r?.get('graph') as Maybe<ITypeGraph>))),

  // The cypher here must be dynamic because we can't have the label as parameter
  // https://community.neo4j.com/t/having-a-label-as-a-parameter-in-a-cypher-query-efficiently/26555/4
  createTypes: (
    txn: RxTransaction,
    types: Array<IType & { auth0Id?: string }>,
  ) => {
    if (types.length === 0) {
      return of([])
    }

    const params: Record<string, any> = {}
    let n = 0
    const nodeKeys: Array<string> = []

    const cypher = types.reduce((cypherAgg, type) => {
      const auth0Id = type.auth0Id
      const paramKey = `props${n}`
      params[paramKey] = omit(type, [
        'typeKind',
        'owner',
        'ownerId',
        'auth0Id',
        '__resolveType',
      ]) // assign the type array to a parameter we will pass later to the query

      // sanitize labels, since they can be passed in from the user
      if (!allowedLabels.has(type.typeKind as TypeKind)) {
        throw new Error(
          `Invalid type kind: ${type.typeKind} is not in allowed ones: ${allowedLabels}`,
        )
      }

      const nodeKey = `node${n}` // assign a specific node variable key so we can extract them all at the end and return them
      nodeKeys.push(nodeKey)

      const ownerCy = ` MATCH (${nodeKey}), (u:User) where u.auth0Id='${auth0Id}' CREATE (${nodeKey})<-[r:OWNS_TYPE]-(u)`
      const unionAll = n > 0 && n < types.length ? ' UNION ALL ' : ''

      n++

      return `${cypherAgg}${unionAll}
      CREATE (${nodeKey}:${type.typeKind} $${paramKey}) with ${nodeKey}
      ${ownerCy} return ${nodeKey} as nodes`
    }, '')

    return txn
      .run(`${cypher}`, params)
      .records()
      .pipe(map((r) => r?.get('nodes') as Array<IType>))
  },

  //
  upsertTypes: (txn: RxTransaction, types: Array<IType>, auth0Id: string) => {
    if (types.length === 0) {
      return of([])
    }

    const params: Record<string, any> = {}
    let n = 0

    const cypher = types.reduce((cypherAgg, type: any) => {
      const paramKey = `props${n}`
      const nodeKey = `node${n}` // assign a specific node variable key so we can extract them all at the end and return them
      const resoveType = type.__resolveType
      params[paramKey] = omit(type, [
        'typeKind',
        'owner',
        'ownerId',
        '__resolveType',
      ]) // assign the type array to a parameter we will pass later to the query

      const parameters = Object.keys(params[paramKey]).reduce(
        (allMergeParams: Array<string>, cur: string) => {
          const p = ` ${nodeKey}.${cur} = '${params[paramKey][cur]}' `
          allMergeParams.push(p)

          return allMergeParams
        },
        [],
      )

      // sanitize labels, since they can be passed in from the user
      if (!allowedLabels.has(type.typeKind as ITypeKind)) {
        throw new Error(
          `Invalid type kind: ${type.typeKind} is not in allowed ones: ${allowedLabels}`,
        )
      }

      const ownerCy =
        resoveType !== 'EnumTypeValue'
          ? ` MATCH (${nodeKey}), (u:User) where u.auth0Id='${auth0Id}' MERGE (${nodeKey})<-[r:OWNS_TYPE]-(u)`
          : ''

      const unionAll = n > 0 && n < types.length ? ' UNION ALL ' : ''

      n++

      return `${cypherAgg}${unionAll}
        MERGE (${nodeKey}:${type.typeKind} {id: '${type.id}'}) 
          ON CREATE
            SET
              ${parameters.join(', ')}
          ON MATCH
            SET
              ${parameters.join(', ')}
        with ${nodeKey}
        ${ownerCy} return ${nodeKey} as nodes`
    }, '')

    return txn
      .run(`${cypher}`)
      .records()
      .pipe(map((r) => r?.get('nodes') as Array<IType>))
  },
}

const allowedLabels = new Set(Object.values(ITypeKind))
