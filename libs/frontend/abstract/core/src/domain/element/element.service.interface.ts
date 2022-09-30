import {
  ElementUpdateInput,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import {
  ICreatePropMapBindingDTO,
  IPropMapBinding,
  IUpdatePropMapBindingDTO,
} from '../prop'
import { IInterfaceType } from '../type'
import { IAuth0Id } from '../user'
import {
  ICreateElementDTO,
  IElementDTO,
  IUpdateElementDTO,
} from './element.dto.interface'
import { IElement, IElementRef } from './element.model.interface'
import { IElementTree } from './element-tree.interface.model'
// import { DropPosition } from 'libs/frontend/modules/renderer/src/element/CustomDraggableElement'

/**
 * Used for modal input
 */
export interface CreateElementData {
  parentElement: Ref<IElement>
}

export interface CreateElementProperties {
  parentElement: IElement
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
    ICacheService<IElementDTO, IElement>,
    Omit<IQueryService<IElement, ElementWhere>, 'getOne'>,
    Omit<
      ICRUDModalService<Ref<IElement>, { element?: IElement }>,
      'createModal'
    > {
  createModal: IEntityModalService<
    CreateElementData,
    { parentElement: IElement }
  >
  elements: ObjectMap<IElement>
  createPropMapBindingModal: IEntityModalService<
    Ref<IElement>,
    { element: Maybe<IElement> }
  >
  updatePropMapBindingModal: IEntityModalService<PropMapData, PropMapProperties>
  deletePropMapBindingModal: IEntityModalService<PropMapData, PropMapProperties>

  // moveElement(
  //   targetElementId: IElementRef,
  //   moveData: MoveData,
  // ): Promise<IElement>
  createElementAsFirstChild(data: ICreateElementDTO): Promise<IElement>
  createElementAsNextSibling(data: ICreateElementDTO): Promise<IElement>
  attachElementAsFirstChild(props: {
    elementId: string
    parentElementId: string
  }): Promise<void>
  attachElementAsNextSibling(props: {
    elementId: string
    targetElementId: string
  }): Promise<void>
  moveElementAsFirstChild(props: {
    elementId: string
    parentElementId: string
  }): Promise<void>
  moveElementAsNextSibling(props: {
    elementId: string
    targetElementId: string
  }): Promise<void>
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
  removeDeletedPropDataFromElements(
    interfaceType: IInterfaceType,
    propKey: string,
  ): Promise<void>
}
