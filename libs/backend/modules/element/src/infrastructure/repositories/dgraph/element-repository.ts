import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import {
  BaseRepository,
  combineFilters,
  DgraphEntityType,
  DgraphRepository,
  ITransaction,
  makeCreateResponse,
  makeCreateResponses,
  mergeAndMutate,
  randomBlankNode,
} from '@codelab/backend/infra'
import { HookMutationFactory } from '@codelab/backend/modules/hook'
import {
  ElementSchema,
  IElement,
  IElementEdge,
  IElementGraph,
  IEnumTypeValue,
  IHook,
  IPropMapBinding,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { ElementTree, getCyElementData } from '@codelab/shared/core'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import Fuse from 'fuse.js'
import { v4 } from 'uuid'
import { z } from 'zod'
import {
  ComponentWhere,
  ElementExistsAndOwnerResponse,
  GetReferencesResponse,
  IElementRepository,
} from '../abstract/element-repository.interface'
import { ElementMutationFactory } from './element-mutation.factory'
import {
  ElementAndOwnerQueryResult,
  ElementQueryFactory,
  GetLastOrderInParentQueryResult,
  GetReferencesQueryResult,
  GetRootContainerQueryResult,
} from './element-query.factory'
import { PropMapBindingMutationFactory } from './prop-map-binding-mutation.factory'

// Validates the Element (extending from the base ElementSchema)
// and transforms parentElement from an array to a singular object, since ([parent] => parent)
// since dgraph returns it as an array from the query
const ElementRepoSchema = ElementSchema.or(
  ElementSchema.extend({
    parentElement: z
      .object({ id: z.string(), order: z.number().nullish() })
      .nullish()
      .array()
      .nullish()
      .transform((v) => (v && Array.isArray(v) ? v[0] : v)),
  }),
)

@Injectable()
export class ElementRepository
  extends BaseRepository<IElement, ElementQueryFactory, ElementMutationFactory>
  implements IElementRepository
{
  private readonly hookMutationFactory: HookMutationFactory

  private readonly propMapMutationFactory: PropMapBindingMutationFactory

  constructor(protected dgraph: DgraphRepository) {
    super(
      dgraph,
      DgraphEntityType.Element,
      new ElementQueryFactory(),
      new ElementMutationFactory(),
      ElementRepoSchema,
    )
    this.hookMutationFactory = new HookMutationFactory()
    this.propMapMutationFactory = new PropMapBindingMutationFactory()
  }

  async updateAll(
    elements: Array<IElement>,
    transaction: ITransaction,
  ): Promise<void> {
    if (!elements.length) {
      return
    }

    elements = this.parseArray(elements)

    const updatedById = new Map(elements.map((e) => [e.id, e]))
    const elementIds = Array.from(updatedById.keys())
    const existingElements = await this.getAllByIds(elementIds, transaction)

    const mutations = existingElements.map((existing) => {
      const updated = updatedById.get(existing.id)

      if (!updated) {
        // Should never happen
        throw new Error(`Could not find updated entity for ${existing.id}`)
      }

      return this.mutationFactory.forUpdate(updated, existing)
    })

    await mergeAndMutate(transaction, ...mutations)
  }

  async createAll(
    elements: Array<IElement>,
    transaction: ITransaction,
  ): Promise<Array<CreateResponse>> {
    if (!elements?.length) {
      return []
    }

    elements = this.parseArray(elements)

    const blankNodes: Array<string> = []

    const mutations = elements.map((e) => {
      const uid = randomBlankNode()
      blankNodes.push(uid)

      return this.mutationFactory.forCreate(e, uid)
    })

    const res = await mergeAndMutate(transaction, ...mutations)

    return makeCreateResponses(res, blankNodes)
  }

  async getLastOrderInParent(
    parentId: string,
    transaction: ITransaction,
  ): Promise<Maybe<number>> {
    const queryName = 'order'
    const query = this.queryFactory.forGetLastOrderInParent(parentId, queryName)

    const result =
      await this.dgraph.getOneNamed<GetLastOrderInParentQueryResult>(
        transaction,
        query,
        queryName,
      )

    return result?.lastOrder ?? undefined
  }

  async elementExistsAndGetOwner(
    elementId: string,
    transaction: Txn,
  ): Promise<ElementExistsAndOwnerResponse> {
    const query = this.queryFactory.forElementAndOwner(elementId)

    const result = await this.dgraph.executeQuery<ElementAndOwnerQueryResult>(
      transaction,
      query,
    )

    const elementExists = !!result.element?.[0]?.id
    const ownerId = result.rootOwner?.[0]?.id ?? result.element?.[0]?.owner?.id

    return { elementExists, ownerId }
  }

  async isElementRoot(
    elementId: string,
    transaction: Txn,
  ): Promise<Maybe<boolean>> {
    const queryName = 'rootContainerId'

    const query: string = this.queryFactory.forGetRootContainerId(
      elementId,
      queryName,
    )

    const result = await this.dgraph.getOneNamed<GetRootContainerQueryResult>(
      transaction,
      query,
      queryName,
    )

    return !!result?.containerId
  }

  async getReferences(
    elementId: string,
    transaction: ITransaction,
  ): Promise<Maybe<GetReferencesResponse>> {
    const queryName = 'getReferences'

    const query: string = this.queryFactory.forGetReferences(
      elementId,
      queryName,
    )

    const result = await this.dgraph.getOneNamed<GetReferencesQueryResult>(
      transaction,
      query,
      queryName,
    )

    return {
      parentId: result?.parents?.[0]?.id,
      parentName: result?.parents?.[0]?.name,
      componentInstances: result?.instances ?? [],
    }
  }

  async getComponents(
    where: Maybe<ComponentWhere>,
    transaction: ITransaction,
  ): Promise<Array<IElement>> {
    const queryName = `getComponents`
    const isComponentFilter = 'has(componentTag)'
    const nameFilter = where?.name && `match(name, "${where.name}", 14)`

    const ownerFilter =
      where?.ownerId && `(uid_in(owner, ${where.ownerId}) OR NOT has(owner))`

    const uidsFilter = !!where?.uids?.length && `(uid(${where.uids.join(',')}))`

    const fixedIdsFilter =
      !!where?.fixedIds?.length && `(eq(fixedId, ${where.fixedIds.join(',')}))`

    const filter = combineFilters(
      [isComponentFilter, nameFilter, ownerFilter, uidsFilter, fixedIdsFilter],
      'AND',
    )

    const query = this.queryFactory.forGet(filter, queryName)

    const result = await this.dgraph.getAllNamed<IElement>(
      transaction,
      query,
      queryName,
    )

    if (where?.name) {
      // Dgraph doesn't order the results by relevance, use Fuse for that
      const fuse = new Fuse(result ?? [], {
        keys: ['name', 'componentTag.name'],
        shouldSort: true,
        isCaseSensitive: false,
      })

      return fuse.search(where.name).map((r) => r.item)
    }

    return this.parseArray(result)
  }

  async getOneByFixedId(
    fixedId: string,
    transaction: ITransaction,
  ): Promise<Maybe<IElement>> {
    const queryName = `getElementByFixedId`

    const query: string = this.queryFactory.forGet(
      `eq(fixedId, "${fixedId}")`,
      queryName,
    )

    const result = await this.dgraph.getOneNamed<IElement>(
      transaction,
      query,
      queryName,
    )

    if (!result) {
      return undefined
    }

    return this.parse(result)
  }

  async getGraph(
    rootElementId: string,
    transaction: ITransaction,
  ): Promise<IElementGraph> {
    const query: string = this.queryFactory.forGetGraphByRootId(rootElementId)

    const result = await this.dgraph.executeQuery<IElementGraph>(
      transaction,
      query,
    )

    return {
      edges: result.edges ?? [],
      vertices: this.parseArray(result.vertices),
    }
  }

  async getGraphByRootIds(
    rootElementIds: Array<string>,
    transaction: ITransaction,
  ): Promise<IElementGraph> {
    if (!rootElementIds?.length) {
      return { edges: [], vertices: [] }
    }

    const query: string = this.queryFactory.forGetGraphByRootIds(rootElementIds)

    const result = await this.dgraph.executeQuery<IElementGraph>(
      transaction,
      query,
    )

    return {
      edges: result.edges ?? [],
      vertices: this.parseArray(result.vertices),
    }
  }

  async getGraphByFixedId(
    fixedId: string,
    transaction: ITransaction,
  ): Promise<IElementGraph> {
    const query: string = this.queryFactory.forGetGraphByFixedId(fixedId)

    const result = await this.dgraph.executeQuery<IElementGraph>(
      transaction,
      query,
    )

    return {
      edges: result.edges ?? [],
      vertices: this.parseArray(result.vertices),
    }
  }

  // TODO move to type repository?
  async getEnumValues(
    enumValueIds: Array<string>,
    transaction: ITransaction,
  ): Promise<Array<IEnumTypeValue>> {
    if (!enumValueIds?.length) {
      return []
    }

    const queryName = 'getEnumValues'

    const query: string = this.queryFactory.forEnumValues(
      enumValueIds,
      queryName,
    )

    const result = await this.dgraph.getAllNamed<IEnumTypeValue>(
      transaction,
      query,
      queryName,
    )

    return result ?? []
  }

  async addHook(
    elementId: string,
    hook: IHook,
    transaction: ITransaction,
  ): Promise<CreateResponsePort> {
    const hookUid = '_:theHook'
    const hookMutation = this.hookMutationFactory.forCreate(hook, hookUid)

    const elementHookMutation = this.mutationFactory.forAttachHook(
      elementId,
      hookUid,
    )

    const res = await mergeAndMutate(
      transaction,
      hookMutation,
      elementHookMutation,
    )

    return makeCreateResponse(res, hookUid)
  }

  async removeHook(
    elementId: string,
    hook: IHook,
    transaction: Txn,
  ): Promise<void> {
    const hookMutation = this.hookMutationFactory.forDelete(hook)

    if (!hook.id) {
      throw new Error(
        'Hook id is not defined, the hook must be persisted before it can be removed',
      )
    }

    const elementHookMutation = this.mutationFactory.forDetachHook(
      elementId,
      hook.id,
    )

    await mergeAndMutate(transaction, hookMutation, elementHookMutation)
  }

  async addPropMapBinding(
    elementId: string,
    propMapBinding: IPropMapBinding,
    transaction: Txn,
  ): Promise<CreateResponse> {
    const pmbUid = '_:pmb'

    const hookMutation = this.propMapMutationFactory.forCreate(
      propMapBinding,
      pmbUid,
    )

    const elementPmbMutation = this.mutationFactory.forAttachPropMapBinding(
      elementId,
      pmbUid,
    )

    const res = await mergeAndMutate(
      transaction,
      hookMutation,
      elementPmbMutation,
    )

    return makeCreateResponse(res, pmbUid)
  }

  async removePropMapBinding(
    elementId: string,
    propMapBinding: IPropMapBinding,
    transaction: Txn,
  ): Promise<void> {
    if (!propMapBinding.id) {
      throw new Error(
        'Prop Map Binding id is not defined, it must be persisted before it can be removed',
      )
    }

    const pmbMutation = this.propMapMutationFactory.forDelete(propMapBinding)

    const edgeDeleteMutation = this.mutationFactory.forDetachPropMapBinding(
      elementId,
      propMapBinding.id,
    )

    await mergeAndMutate(transaction, pmbMutation, edgeDeleteMutation)
  }

  async deleteAll(ids: Array<string>, transaction: Txn): Promise<void> {
    // Default impl. won't work, because there's no way to merge upsert mutations using dgraph-js-http
    const existing = await this.getAllByIds(ids, transaction)

    if (existing.length !== ids.length) {
      throw new Error(`Some of the ${this.entityType} do not exist`)
    }

    for (const el of existing) {
      const mutation = this.mutationFactory.forDelete(el)
      await transaction.mutate(mutation)
    }
  }

  async createGraph(
    graph: IElementGraph,
    transaction: ITransaction,
  ): Promise<CreateResponsePort> {
    const tree = new ElementTree(graph)
    const root = tree.getRootElement() || tree.getRootComponent()

    if (!root) {
      throw new Error('No root element or component found')
    }

    const mutations: Array<Mutation> = []
    const idMap = new Map<string, string>()

    tree.bfsVisit((v, e, u) => {
      const vertex = getCyElementData<IElement>(v)
      const edge = getCyElementData<IElementEdge>(e)
      const parent = getCyElementData<IElement>(u)

      if (!vertex) {
        throw new Error('Vertex is not defined')
      }

      let parentId = vertex?.parentElement?.id

      if (parent?.id) {
        if (!idMap.has(parent.id)) {
          throw new Error('Parent id is not defined')
        }

        parentId = idMap.get(parent.id)
      }

      const order = edge?.order || vertex?.parentElement?.order
      const id = `_:el${v4()}`

      idMap.set(vertex.id, id)

      const mutation = this.mutationFactory.forCreate(
        {
          ...vertex,
          parentElement: parentId ? { id: parentId, order } : undefined,
          id,
        },
        id,
      )

      mutations.push(mutation)
    }, root.id)

    const res = await mergeAndMutate(transaction, ...mutations)

    return makeCreateResponse(res, idMap.get(root.id) as string)
  }
}
