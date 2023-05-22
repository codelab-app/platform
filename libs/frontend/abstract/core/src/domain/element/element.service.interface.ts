import type { RenderedComponentFragment } from '@codelab/shared/abstract/codegen'
import type { IAuth0Owner, IElementDTO } from '@codelab/shared/abstract/core'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IEntityModalService,
} from '../../service'
import type {
  ICreateElementData,
  IUpdateElementData,
} from './element.dto.interface'
import type { IElement } from './element.model.interface'
import type { IElementRepository } from './element.repo.interface'
import type { IElementTree } from './element-tree.interface.model'

/**
 * Used for modal input
 */
export interface CreateElementData {
  elementOptions: Array<{
    childrenIds?: Array<string>
    label: string
    value: string
  }>
  elementTree: Ref<IElementTree>
  selectedElement?: Maybe<Ref<IElement>>
}

export interface CreateElementProperties {
  elementTree: IElementTree
  parentElement: IElement
}

export interface UpdateElementProperties {
  element: IElement
}

export interface IElementService
  extends Omit<
      ICRUDService<IElement, ICreateElementData, IUpdateElementData>,
      'delete'
    >,
    Omit<
      ICRUDModalService<Ref<IElement>, { element?: IElement }>,
      'createModal'
    >,
    Omit<
      ICRUDFormService<Ref<IElement>, { element?: IElement }>,
      'createForm'
    > {
  clonedElements: ObjectMap<IElement>
  createForm: IEntityFormService<CreateElementData, CreateElementProperties>
  createModal: IEntityModalService<CreateElementData, CreateElementProperties>
  elementRepository: IElementRepository
  elements: ObjectMap<IElement>
  updateForm: IEntityModalService<Ref<IElement>, UpdateElementProperties>
  updateModal: IEntityModalService<Ref<IElement>, UpdateElementProperties>
  add(elementDTO: IElementDTO): IElement
  cloneElement(
    target: IElement,
    targetParent: IElement,
  ): Promise<Array<IElement>>
  convertElementToComponent(
    element: IElement,
    owner: IAuth0Owner,
  ): Promise<Maybe<IElement>>
  // moveElement(
  //   targetElementId: IElementRef,
  //   moveData: MoveData,
  // ): Promise<IElement>
  createElementAsFirstChild(data: ICreateElementData): Promise<IElement>
  createElementAsNextSibling(data: ICreateElementData): Promise<IElement>
  delete(subRoot: IEntity): Promise<void>
  element(id: string): IElement
  loadComponentTree(component: RenderedComponentFragment): {
    hydratedElements: Array<IElement>
    rootElement: IElement
  }
  maybeElement(id: Maybe<string>): Maybe<IElement>
  moveElementAsFirstChild(props: {
    element: IEntity
    parentElement: IEntity
  }): Promise<void>
  moveElementAsNextSibling(props: {
    element: IEntity
    targetElement: IEntity
  }): Promise<void>
  /**
   * @param props.object an element or a component
   */
  moveNodeToAnotherTree(props: {
    dropPosition: number
    object: IEntity
    targetElement: IEntity
  }): Promise<void>
}
