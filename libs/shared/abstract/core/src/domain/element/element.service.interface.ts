import { ElementWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service'
import { MoveData } from '../builder'
import {
  ICreatePropMapBindingDTO,
  IPropData,
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
  elementTree: IElementTree
  elements: ObjectMap<IElement>
  createModal: IModalService<CreateElementData, { parentElement?: IElement }>
  createPropMapBindingModal: IModalService<
    Ref<IElement>,
    { element: Maybe<IElement> }
  >
  updatePropMapBindingModal: IModalService<PropMapData, PropMapProperties>
  deletePropMapBindingModal: IModalService<PropMapData, PropMapProperties>

  hydrateOrUpdateCache(elements: Array<IElementDTO>): Array<IElement>

  moveElement(
    targetElementId: IElementRef,
    moveData: MoveData,
  ): Promise<IElement>
  duplicateElement(target: IElement, auth0Id: IAuth0Id): Promise<void>
  convertElementToComponent(element: IElement, auth0Id: IAuth0Id): Promise<void>
  element(id: string): Maybe<IElement>
  updateElementProps(element: IElement, data: IPropData): Promise<IElement>
  updateElementCss(element: IElement, newCss: string): Promise<IElement>
  loadPropsComponents(root: IElementRef): Promise<void>

  /**
   * Modify it so it can build a tree from parameter
   */
  getTree(root: IElementRef, mainTree: boolean): Promise<IElementTree>
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
  // loadAllDetached(): Promise<Array<IElement>>
}
