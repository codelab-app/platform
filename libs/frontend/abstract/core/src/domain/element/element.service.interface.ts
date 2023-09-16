import type { RenderedComponentFragment } from '@codelab/shared/abstract/codegen'
import type { IElementDTO } from '@codelab/shared/abstract/core'
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
import type { IElementModel } from './element.model.interface'
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
  selectedElement?: Maybe<Ref<IElementModel>>
}

export interface CreateElementProperties {
  elementTree: IElementTree
  parentElement: IElementModel
}

export interface UpdateElementProperties {
  element: IElementModel
}

export interface IElementService
  extends Omit<
      ICRUDService<IElementModel, ICreateElementData, IUpdateElementData>,
      'delete'
    >,
    Omit<
      ICRUDModalService<Ref<IElementModel>, { element?: IElementModel }>,
      'createModal'
    >,
    Omit<
      ICRUDFormService<Ref<IElementModel>, { element?: IElementModel }>,
      'createForm'
    > {
  clonedElements: ObjectMap<IElementModel>
  createForm: IEntityFormService<CreateElementData, CreateElementProperties>
  createModal: IEntityModalService<CreateElementData, CreateElementProperties>
  elementRepository: IElementRepository
  elements: ObjectMap<IElementModel>
  updateForm: IEntityModalService<Ref<IElementModel>, UpdateElementProperties>
  updateModal: IEntityModalService<Ref<IElementModel>, UpdateElementProperties>
  add(elementDTO: IElementDTO): IElementModel
  cloneElement(
    target: IElementModel,
    targetParent: IElementModel,
  ): Promise<Array<IElementModel>>
  convertElementToComponent(
    element: IElementModel,
    owner: IEntity,
  ): Promise<Maybe<IElementModel>>
  // moveElement(
  //   targetElementId: IElementRef,
  //   moveData: MoveData,
  // ): Promise<IElement>
  createElementAsFirstChild(data: ICreateElementData): Promise<IElementModel>
  createElementAsNextSibling(data: ICreateElementData): Promise<IElementModel>
  delete(subRoot: IEntity): Promise<void>
  element(id: string): IElementModel
  loadComponentTree(component: RenderedComponentFragment): {
    hydratedElements: Array<IElementModel>
    rootElement: IElementModel
  }
  maybeElement(id: Maybe<string>): Maybe<IElementModel>
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
