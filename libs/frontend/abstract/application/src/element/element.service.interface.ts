import type {
  ICloneElementService,
  IElementDomainService,
  IElementModel,
  IElementTree,
  IMoveElementContext,
  IUpdateElementData,
} from '@codelab/frontend/abstract/domain'
import type { ComponentDevelopmentFragment } from '@codelab/shared/abstract/codegen'
import type {
  IElementDTO,
  IElementTypeKind,
} from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  IEntityModalService,
  IFormService,
  IModalService,
} from '../services'
import type { IElementApplicationValidationService } from './element.application.validation.service.interface'
import type { IElementRepository } from './element.repo.interface'

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

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CreateElementProperties = {
  // elementTree: IElementTree | null
  parentElement?: IElementModel
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type UpdateElementProperties = {
  element?: IElementModel
}

export interface SelectElementOption {
  childrenIds?: Array<string>
  label: string
  value: string
}

export interface SelectElementOptions {
  allElementOptions?: Array<SelectElementOption>
  elementTree?: IElementTree
  kind: IElementTypeKind
  targetElementId?: string
}

export interface IElementService
  extends Omit<
    ICRUDModalService<Ref<IElementModel>, { element?: IElementModel }>,
    'createModal'
  > {
  cloneElementService: ICloneElementService
  clonedElements: ObjectMap<IElementModel>
  createForm: IFormService<CreateElementData, CreateElementProperties>
  elementDomainService: IElementDomainService
  elementRepository: IElementRepository
  updateForm: IEntityModalService<Ref<IElementModel>, UpdateElementProperties>
  updateModal: IEntityModalService<Ref<IElementModel>, UpdateElementProperties>
  validationService: IElementApplicationValidationService

  createElement(data: IElementDTO): Promise<IElementModel>
  delete(subRoot: IElementModel): Promise<void>
  element(id: string): IElementModel
  getSelectElementOptions(
    props: SelectElementOptions,
  ): Array<SelectElementOption>
  loadComponentTree(component: ComponentDevelopmentFragment): {
    hydratedElements: Array<IElementModel>
    rootElement: IElementModel
  }
  maybeElement(id: Maybe<string>): Maybe<IElementModel>
  move(context: IMoveElementContext): Promise<void>
  syncModifiedElements(): Promise<void>
  update(data: IUpdateElementData): Promise<IElementModel>
}
