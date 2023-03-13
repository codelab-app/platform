import type {
  ElementOptions,
  ElementUpdateInput,
  ElementWhere,
  RenderedComponentFragment,
} from '@codelab/shared/abstract/codegen'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import type { IAuth0Owner } from '../user'
import type {
  ICreateElementData,
  IElementDTO,
  IUpdateElementData,
} from './element.dto.interface'
import type { IElement } from './element.model.interface'
import type { IElementRepository } from './element.repo.interface'
import type { IElementTree } from './element-tree.interface.model'

/**
 * Used for modal input
 */
export interface CreateElementData {
  selectedElement?: Maybe<Ref<IElement>>
  elementTree: Ref<IElementTree>
}

export interface CreateElementProperties {
  parentElement: IElement
  elementTree: IElementTree
}

export interface UpdateElementProperties {
  element: IElement
}

export interface IElementService
  extends Omit<
      ICRUDService<IElement, ICreateElementData, IUpdateElementData>,
      'delete'
    >,
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
  elementRepository: IElementRepository

  // moveElement(
  //   targetElementId: IElementRef,
  //   moveData: MoveData,
  // ): Promise<IElement>
  createElementAsFirstChild(data: ICreateElementData): Promise<IElement>
  createElementAsNextSibling(data: ICreateElementData): Promise<IElement>
  moveElementToAnotherTree(props: {
    element: IEntity
    targetElement: IEntity
    dropPosition: number
  }): Promise<void>
  moveElementAsFirstChild(props: {
    element: IEntity
    parentElement: IEntity
  }): Promise<void>
  add(elementDTO: IElementDTO): IElement
  moveElementAsNextSibling(props: {
    element: IEntity
    targetElement: IEntity
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
  maybeElement(id: Maybe<string>): Maybe<IElement>
  delete(subRoot: IEntity): Promise<void>
  patchElement(element: IElement, input: ElementUpdateInput): Promise<IElement>
  loadComponentTree(component: RenderedComponentFragment): {
    rootElement: IElement
    hydratedElements: Array<IElement>
  }
}
