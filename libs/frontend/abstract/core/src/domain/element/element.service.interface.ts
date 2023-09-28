import type {
  IElementDTO,
  IElementRenderTypeDto,
} from '@codelab/shared/abstract/core'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IEntityModalService,
} from '../../service'
import type { ComponentDevelopmentFragment } from '../component/component-development.fragment.graphql.gen'
import type {
  ICreateElementData,
  IUpdateElementData,
} from './element.dto.interface'
import type { IElementModel } from './element.model.interface'
import type { IElementRepository } from './element.repo.interface'
import type { IElementTree } from './element-tree.interface.model'
import type { IElementRenderTypeModel } from './render-type'
import type { ICloneElementService } from './use-cases/clone-element.service.interface'
import type { ICreateElementService } from './use-cases/create-element.service.interface'
import type { IMoveElementService } from './use-cases/move-element.service.interface'

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
  cloneElementService: ICloneElementService
  clonedElements: ObjectMap<IElementModel>
  createElementService: ICreateElementService
  createForm: IEntityFormService<CreateElementData, CreateElementProperties>
  createModal: IEntityModalService<CreateElementData, CreateElementProperties>
  elementRepository: IElementRepository
  elements: ObjectMap<IElementModel>
  moveElementService: IMoveElementService
  updateForm: IEntityModalService<Ref<IElementModel>, UpdateElementProperties>
  updateModal: IEntityModalService<Ref<IElementModel>, UpdateElementProperties>

  add(elementDTO: IElementDTO): IElementModel

  // moveElement(
  //   targetElementId: IElementRef,
  //   moveData: MoveData,
  // ): Promise<IElement>
  delete(subRoot: IEntity): Promise<void>
  element(id: string): IElementModel
  loadComponentTree(component: ComponentDevelopmentFragment): {
    hydratedElements: Array<IElementModel>
    rootElement: IElementModel
  }
  loadRenderType(
    renderType: IElementRenderTypeDto,
  ): Promise<IElementRenderTypeModel>
  // loadElement(element: IElementDTO): void
  maybeElement(id: Maybe<string>): Maybe<IElementModel>

  updateAffectedElements(elementIds: Array<string>): Promise<void>
}
