import type {
  ElementOptions,
  ElementUpdateInput,
  ElementWhere,
  RenderedComponentFragment,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import type {
  ICreatePropMapBindingDTO,
  IPropMapBinding,
  IUpdatePropMapBindingDTO,
} from '../prop'
import type { IAuth0Id } from '../user'
import type { IComputeElementNameService } from './compute-element-name.service.interface'
import type {
  ICreateElementDTO,
  IElementDTO,
  IUpdateElementDTO,
} from './element.dto.interface'
import type { IElement, IElementRef } from './element.model.interface'

/**
 * Used for modal input
 */
export interface CreateElementData {
  parentElement: Ref<IElement>
}

export interface CreateElementProperties {
  parentElement: IElement
  computeElementNameService: IComputeElementNameService
}

export interface UpdateElementProperties {
  element: IElement
  computeElementNameService: IComputeElementNameService
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
    Omit<IQueryService<IElement, ElementWhere, ElementOptions>, 'getOne'>,
    Omit<
      ICRUDModalService<Ref<IElement>, { element?: IElement }>,
      'createModal'
    > {
  createModal: IEntityModalService<CreateElementData, CreateElementProperties>
  updateModal: IEntityModalService<Ref<IElement>, UpdateElementProperties>
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
  moveElementToAnotherTree(props: {
    elementId: string
    targetElementId: string
    dropPosition: number
  }): Promise<void>
  moveElementAsFirstChild(props: {
    elementId: string
    parentElementId: string
  }): Promise<void>
  moveElementAsNextSibling(props: {
    elementId: string
    targetElementId: string
  }): Promise<void>
  cloneElement(
    target: IElement,
    targetParent: IElement,
  ): Promise<Array<IElement>>
  convertElementToComponent(
    element: IElement,
    auth0Id: IAuth0Id,
  ): Promise<Maybe<IElement>>
  element(id: string): Maybe<IElement>
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
  loadComponentTree(component: RenderedComponentFragment): {
    rootElement: IElement
    hydratedElements: Array<IElement>
  }
}
