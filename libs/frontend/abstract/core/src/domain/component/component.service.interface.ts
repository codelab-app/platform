import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type { IComponentDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IPaginateable,
  IQueryService,
} from '../../service'
import type {
  ICreateComponentData,
  IUpdateComponentData,
} from './component.dto.interface'
import type { IComponentModel } from './component.model.interface'
import type { IComponentRepository } from './component.repo.interface'

export interface IComponentService
  extends ICRUDService<
      IComponentModel,
      ICreateComponentData,
      IUpdateComponentData
    >,
    IQueryService<IComponentModel, ComponentWhere, ComponentOptions>,
    ICRUDModalService<
      Ref<IComponentModel>,
      { component: Maybe<IComponentModel> }
    >,
    IPaginateable<IComponentModel, { name?: string }> {
  clonedComponents: ObjectMap<IComponentModel>
  componentList: Array<IComponentModel>
  componentRepository: IComponentRepository
  components: ObjectMap<IComponentModel>
  createForm: IEntityFormService

  add(componentDTO: IComponentDTO): IComponentModel
  component(id: string): IComponentModel
}
