import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { IBaseRepository, ITransaction } from '@codelab/backend/infra'
import {
  IElement,
  IElementGraph,
  IEnumTypeValue,
  IHook,
  IPropMapBinding,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'

export interface IElementRepository extends IBaseRepository<IElement> {
  updateAll(elements: Array<IElement>, transaction: ITransaction): Promise<void>

  getOneByFixedId(
    fixedId: string,
    transaction: ITransaction,
  ): Promise<Maybe<IElement>>

  /** Returns the largest order number in  the child elements of the given element, or undefined if none found */
  getLastOrderInParent(
    parentId: string,
    transaction: ITransaction,
  ): Promise<Maybe<number>>

  /**
   * Get all elements, that:
   *   - have a component tag
   *   - are either owned by the ownerId OR  are not owned by anyone
   */
  getComponents(
    where: Maybe<ComponentWhere>,
    transaction: ITransaction,
  ): Promise<Array<IElement>>

  /** Returns if the element exists and its ownerId */
  elementExistsAndGetOwner(
    elementId: string,
    transaction: ITransaction,
  ): Promise<ElementExistsAndOwnerResponse>

  /** Returns whether the element is a root element or not */
  isElementRoot(
    elementId: string,
    transaction: ITransaction,
  ): Promise<Maybe<boolean>>

  getReferences(
    elementId: string,
    transaction: ITransaction,
  ): Promise<Maybe<GetReferencesResponse>>

  getGraph(
    rootElementId: string,
    transaction: ITransaction,
  ): Promise<IElementGraph>

  getGraphByRootIds(
    rootElementIds: Array<string>,
    transaction: ITransaction,
  ): Promise<IElementGraph>

  getGraphByFixedId(
    fixedId: string,
    transaction: ITransaction,
  ): Promise<IElementGraph>

  getEnumValues(
    enumValueIds: Array<string>,
    transaction: ITransaction,
  ): Promise<Array<IEnumTypeValue>>

  addHook(
    elementId: string,
    hook: IHook,
    transaction: ITransaction,
  ): Promise<CreateResponsePort>

  removeHook(
    elementId: string,
    hook: IHook,
    transaction: ITransaction,
  ): Promise<void>

  addPropMapBinding(
    elementId: string,
    propMapBinding: IPropMapBinding,
    transaction: ITransaction,
  ): Promise<CreateResponsePort>

  removePropMapBinding(
    elementId: string,
    propMapBinding: IPropMapBinding,
    transaction: ITransaction,
  ): Promise<void>

  /**
   * Stores the graph with all the edges and returns the root element id
   * Placeholder ids should be used for edge references and element ids
   * They should be ignored by the storage, except for resolving the edge references
   * The edges should override the element's parent.id field
   * */
  createGraph(
    graph: IElementGraph,
    transaction: ITransaction,
  ): Promise<CreateResponsePort>
}

export interface ComponentWhere {
  name?: string
  ownerId?: string
  uids?: Array<string>
  fixedIds?: Array<string>
}

export interface ElementExistsAndOwnerResponse {
  elementExists: boolean
  ownerId: Maybe<string>
}

export interface GetReferencesResponse {
  parentId?: string
  parentName?: string
  componentInstances: Array<{ id: string; name: string }>
}

export const IElementRepositoryToken = Symbol('ElementRepository')
