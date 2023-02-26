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
import type { IAuth0Owner } from '../user'
import type { IComputeElementNameService } from './compute-element-name.service.interface'
import type {
  ICreateElementData,
  IElementDTO,
  IUpdateElementData,
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

export interface IElementService
  extends Omit<
      ICRUDService<IElement, ICreateElementData, IUpdateElementData>,
      'delete' | 'update'
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
  elementNames: Array<string>
  clonedElements: ObjectMap<IElement>
  // moveElement(
  //   targetElementId: IElementRef,
  //   moveData: MoveData,
  // ): Promise<IElement>
  update(element: IElement, input: IUpdateElementData): Promise<Array<IElement>>
  createElementAsFirstChild(data: ICreateElementData): Promise<IElement>
  createElementAsNextSibling(data: ICreateElementData): Promise<IElement>
  moveElementToAnotherTree(props: {
    elementId: string
    targetElementId: string
    dropPosition: number
  }): Promise<void>
  moveElementAsFirstChild(props: {
    elementId: string
    parentElementId: string
  }): Promise<void>
  create(elementDTO: ICreateElementData): IElement
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
    owner: IAuth0Owner,
  ): Promise<Maybe<IElement>>
  element(id: string): IElement
  maybeElement(id: string): Maybe<IElement>
  deleteElementSubgraph(root: IElementRef): Promise<Array<string>>
  patchElement(element: IElement, input: ElementUpdateInput): Promise<IElement>
  loadComponentTree(component: RenderedComponentFragment): {
    rootElement: IElement
    hydratedElements: Array<IElement>
  }
}
