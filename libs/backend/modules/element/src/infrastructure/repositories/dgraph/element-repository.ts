import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import {
  BaseRepository,
  DgraphEntityType,
  DgraphRepository,
  ITransaction,
  mergeMutations,
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

// Treat the element a bit different, since we retrieve the parentElement as an array
// This transforms it to a singular value
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

    const updatedEntities = this.schema
      ? ElementSchema.array().parse(elements)
      : elements

    const updatedById = new Map(updatedEntities.map((e) => [e.id, e]))

    const existingElements = await this.getAllByIds(
      elements.map((e) => e.id),
      transaction,
    )

    const mutations = existingElements.map((existing) => {
      const updated = updatedById.get(existing.id)

      if (!updated) {
        // Should never happen
        throw new Error(`Could not find updated entity for ${existing.id}`)
      }

      return this.mutationFactory.forUpdate(updated, existing)
    })

    const merged = mergeMutations(...mutations)

    await transaction.mutate(merged)
  }

  async createAll(
    elements: Array<IElement>,
    transaction: ITransaction,
  ): Promise<Array<CreateResponse>> {
    if (!elements?.length) {
      return []
    }

    elements = this.schema
      ? ElementRepoSchema.array().parse(elements)
      : elements

    const blankNodes: Array<string> = []

    const mutations = elements.map((e) => {
      const uid = DgraphRepository.randomBlankNode()
      blankNodes.push(uid)

      return this.mutationFactory.forCreate(e, uid)
    })

    const merged = mergeMutations(...mutations)
    const res = await transaction.mutate(merged)

    return blankNodes.map((uid) => ({ id: DgraphRepository.getUid(res, uid) }))
  }

  async getLastOrderInParent(
    parentId: string,
    transaction: ITransaction,
  ): Promise<number | undefined> {
    const result =
      await this.dgraph.getOneNamed<GetLastOrderInParentQueryResult>(
        transaction,
        this.queryFactory.forGetLastOrderInParent(parentId, 'order'),
        'order',
      )

    return result?.lastOrder ?? undefined
  }

  async elementExistsAndGetOwner(
    elementId: string,
    transaction: Txn,
  ): Promise<ElementExistsAndOwnerResponse> {
    const result = await this.dgraph.executeQuery<ElementAndOwnerQueryResult>(
      transaction,
      this.queryFactory.forElementAndOwner(elementId),
    )

    return {
      elementExists: !!result.element?.[0]?.id,
      ownerId: result.rootOwner?.[0]?.id ?? result.element?.[0]?.owner?.id,
    }
  }

  async isElementRoot(
    elementId: string,
    transaction: Txn,
  ): Promise<boolean | undefined> {
    const result = await this.dgraph.getOneNamed<GetRootContainerQueryResult>(
      transaction,
      this.queryFactory.forGetRootContainerId(elementId, 'rootContainerId'),
      'rootContainerId',
    )

    return !!result?.containerId
  }

  async getReferences(
    elementId: string,
    transaction: ITransaction,
  ): Promise<GetReferencesResponse | undefined> {
    const result = await this.dgraph.getOneNamed<GetReferencesQueryResult>(
      transaction,
      this.queryFactory.forGetReferences(elementId, 'getReferences'),
      'getReferences',
    )

    return {
      parentId: result?.parents?.[0]?.id,
      parentName: result?.parents?.[0]?.name,
      componentInstances: result?.instances ?? [],
    }
  }

  async getComponents(
    where: ComponentWhere | undefined,
    transaction: ITransaction,
  ): Promise<Array<IElement>> {
    const queryName = `getComponents`

    const nameFilter = where?.name
      ? ` AND match(name, "${where.name}", 14)`
      : ''

    const ownerFilter = where?.ownerId
      ? ` AND (uid_in(owner, ${where.ownerId}) OR NOT has(owner))`
      : ''

    const uidsFilter = where?.uids?.length
      ? ` AND (uid(${where.uids.join(',')}))`
      : ''

    const fixedIdsFilter = where?.fixedIds?.length
      ? ` AND (eq(fixedId, ${where.fixedIds.join(',')}))`
      : ''

    const dynamicFilter = ` ${ownerFilter} ${uidsFilter} ${nameFilter} ${fixedIdsFilter} `

    const result = await this.dgraph.getAllNamed<IElement>(
      transaction,
      this.queryFactory.forGet(`has(componentTag) ${dynamicFilter}`, queryName),
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

    return ElementRepoSchema.array().parse(result ?? [])
  }

  async getOneByFixedId(
    fixedId: string,
    transaction: ITransaction,
  ): Promise<IElement | undefined> {
    const queryName = `getElementByFixedId`

    const result = await this.dgraph.getOneNamed<IElement>(
      transaction,
      this.queryFactory.forGet(`eq(fixedId, "${fixedId}")`, queryName),
      queryName,
    )

    return result ? ElementRepoSchema.parse(result) : undefined
  }

  async getGraph(
    rootElementId: string,
    transaction: ITransaction,
  ): Promise<IElementGraph> {
    const result = await this.dgraph.executeQuery<IElementGraph>(
      transaction,
      this.queryFactory.forGetGraphByRootId(rootElementId),
    )

    return {
      edges: result.edges ?? [],
      vertices: ElementRepoSchema.array().parse(result.vertices ?? []),
    }
  }

  async getGraphByRootIds(
    rootElementIds: Array<string>,
    transaction: ITransaction,
  ): Promise<IElementGraph> {
    if (!rootElementIds?.length) {
      return { edges: [], vertices: [] }
    }

    const result = await this.dgraph.executeQuery<IElementGraph>(
      transaction,
      this.queryFactory.forGetGraphByRootIds(rootElementIds),
    )

    return {
      edges: result.edges ?? [],
      vertices: ElementRepoSchema.array().parse(result.vertices ?? []),
    }
  }

  async getGraphByFixedId(
    fixedId: string,
    transaction: ITransaction,
  ): Promise<IElementGraph> {
    const result = await this.dgraph.executeQuery<IElementGraph>(
      transaction,
      this.queryFactory.forGetGraphByFixedId(fixedId),
    )

    return {
      edges: result.edges ?? [],
      vertices: ElementRepoSchema.array().parse(result.vertices ?? []),
    }
  }

  // TODO move to type repository?
  async getEnumValues(
    enumValueIds: Array<string>,
    transaction: ITransaction,
  ): Promise<Array<IEnumTypeValue>> {
    const queryName = 'getEnumValues'

    if (!enumValueIds?.length) {
      return []
    }

    const result = await this.dgraph.getAllNamed<IEnumTypeValue>(
      transaction,
      this.queryFactory.forEnumValues(enumValueIds, queryName),
      queryName,
    )

    return result ?? []
  }

  async addHook(
    elementId: string,
    hook: IHook,
    transaction: ITransaction,
  ): Promise<CreateResponse> {
    const hookUid = '_:theHook'
    const hookMutation = this.hookMutationFactory.forCreate(hook, hookUid)

    const elementHookMutation = this.mutationFactory.forAttachHook(
      elementId,
      hookUid,
    )

    const res = await transaction.mutate(
      mergeMutations(hookMutation, elementHookMutation),
    )

    return {
      id: DgraphRepository.getUid(res, hookUid),
    }
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

    await transaction.mutate(mergeMutations(hookMutation, elementHookMutation))
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

    const res = await transaction.mutate(
      mergeMutations(hookMutation, elementPmbMutation),
    )

    return {
      id: DgraphRepository.getUid(res, pmbUid) as string,
    }
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

    await transaction.mutate(mergeMutations(pmbMutation, edgeDeleteMutation))
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

      let parentId: string | undefined = vertex?.parentElement?.id

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

    const merged = mergeMutations(...mutations)
    const res = await transaction.mutate(merged)

    return { id: DgraphRepository.getUid(res, idMap.get(root.id) as string) }
  }
}
