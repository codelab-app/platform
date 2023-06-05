import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
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
  IComponentDTO,
  ICreateComponentData,
  IUpdateComponentData,
} from './component.dto.interface'
import type { IComponent } from './component.model.interface'
import type { IComponentRepository } from './component.repo.interface'

export interface IComponentService
  extends ICRUDService<IComponent, ICreateComponentData, IUpdateComponentData>,
    IQueryService<IComponent, ComponentWhere, ComponentOptions>,
    ICRUDModalService<Ref<IComponent>, { component: Maybe<IComponent> }>,
    IPaginateable<IComponent, { name?: string }> {
  clonedComponents: ObjectMap<IComponent>
  componentList: Array<IComponent>
  componentRepository: IComponentRepository
  components: ObjectMap<IComponent>
  createForm: IEntityFormService

  add(componentDTO: IComponentDTO): IComponent
  component(id: string): IComponent
}
