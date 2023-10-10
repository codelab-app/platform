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
import type { ComponentDevelopmentFragment } from '../component/component-development.fragment.graphql.gen'
import type {
  IElementDomainService,
  IMoveElementContext,
} from './element.domain.service.interface'
import type { IUpdateElementData } from './element.dto.interface'
import type { IElementModel } from './element.model.interface'
import type { IElementRepository } from './element.repo.interface'
import type { IElementTree } from './element-tree.interface.model'
import type { ICloneElementService } from './use-cases/clone-element.service.interface'

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
      ICRUDService<IElementModel, IElementDTO, IUpdateElementData>,
      'create' | 'delete'
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
  createForm: IEntityFormService<CreateElementData, CreateElementProperties>
  createModal: IEntityModalService<CreateElementData, CreateElementProperties>
  elementDomainService: IElementDomainService
  elementRepository: IElementRepository
  updateForm: IEntityModalService<Ref<IElementModel>, UpdateElementProperties>
  updateModal: IEntityModalService<Ref<IElementModel>, UpdateElementProperties>

  createElement(data: IElementDTO): Promise<IElementModel>
  delete(subRoot: IEntity): Promise<void>
  element(id: string): IElementModel
  loadComponentTree(component: ComponentDevelopmentFragment): {
    hydratedElements: Array<IElementModel>
    rootElement: IElementModel
  }
  maybeElement(id: Maybe<string>): Maybe<IElementModel>
  move(context: IMoveElementContext): Promise<void>
  syncModifiedElements(): Promise<void>
}
