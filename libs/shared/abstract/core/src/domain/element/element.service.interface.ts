import {
  ElementUpdateInput,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service'
import {
  ICreatePropMapBindingDTO,
  IPropMapBinding,
  IUpdatePropMapBindingDTO,
} from '../prop'
import { IAuth0Id } from '../user'
import {
  ICreateElementDTO,
  IElementDTO,
  IUpdateElementDTO,
} from './element.dto.interface'
import { IElement, IElementRef } from './element.model.interface'
import { IElementTree } from './element-tree.interface.model'

/**
 * Used for modal input
 */
export interface CreateElementData {
  parentElement?: Ref<IElement>
}

export interface CreateElementProperties {
  parentElement?: IElement
}

export interface PropMapData {
  propMapBinding: Ref<IPropMapBinding>
  element: Ref<IElement>
}

export interface PropMapProperties {
  propMapBinding: Maybe<IPropMapBinding>
  element: Maybe<IElement>
}

export interface IElementService
  extends Omit<
      ICRUDService<IElement, ICreateElementDTO, IUpdateElementDTO>,
      'delete'
    >,
    Omit<IQueryService<IElement, ElementWhere>, 'getOne'>,
    Omit<
      ICRUDModalService<Ref<IElement>, { element: Maybe<IElement> }>,
      'createModal'
    > {
  // link element
  linkElement(props: {
    element: IElement
    prevSiblingId: Nullish<string>
    nextSiblingId: Nullish<string>
    parentElementId: Nullish<string>
    shouldUpdateCache?: boolean
  }): Promise<void>

  // elementTree: IElementTree
  elements: ObjectMap<IElement>
  createModal: IModalService<CreateElementData, { parentElement?: IElement }>
  createPropMapBindingModal: IModalService<
    Ref<IElement>,
    { element: Maybe<IElement> }
  >
  updatePropMapBindingModal: IModalService<PropMapData, PropMapProperties>
  deletePropMapBindingModal: IModalService<PropMapData, PropMapProperties>

  hydrateOrUpdateCache(elements: Array<IElementDTO>): Array<IElement>
  // moveElement(
  //   targetElementId: IElementRef,
  //   moveData: MoveData,
  // ): Promise<IElement>
  moveAsRoot(elementId: string, targetId: string): Promise<void>
  moveElementNextTo(elementId: string, targetId: string): Promise<void>
  duplicateElement(
    target: IElement,
    auth0Id: IAuth0Id,
    elementTree: IElementTree | null,
  ): Promise<void>
  convertElementToComponent(
    element: IElement,
    auth0Id: IAuth0Id,
    elementTree: Nullable<IElementTree>,
  ): Promise<void>
  element(id: string): Maybe<IElement>

  updateElementsPropTransformationJs(
    element: IElement,
    newPropTransformJs: string,
  ): Promise<IElement>
  createPropMapBinding(
    element: IElement,
    createInput: ICreatePropMapBindingDTO,
  ): Promise<IPropMapBinding>
  updatePropMapBinding(
    element: IElement,
    propMapBinding: IPropMapBinding,
    updateData: IUpdatePropMapBindingDTO,
  ): Promise<IPropMapBinding>
  deleteElementSubgraph(root: IElementRef): Promise<Array<string>>
  deletePropMapBinding(
    element: IElement,
    propMapBinding: IPropMapBinding,
  ): Promise<IPropMapBinding>
  patchElement(element: IElement, input: ElementUpdateInput): Promise<IElement>
  /**
   * Get all descendant elements
   */
  getDescendants(root: IElementRef): Promise<Array<IElement>>
}
