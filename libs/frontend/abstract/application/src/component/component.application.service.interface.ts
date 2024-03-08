import type {
  IComponentDomainService,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type {
  ICreateComponentData,
  IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import type { DefaultOptionType } from 'antd/lib/select'
import type { Ref } from 'mobx-keystone'
import type { IFormService } from '../services/form.service.interface'
import type { ICRUDModalService } from '../services/modal.service.interface'
import type { IPaginateable } from '../services/pagination.service.interface'
import type {
  ICRUDService,
  IQueryService,
} from '../services/query.service.interface'
import type { IComponentRepository } from './component.repo.interface'

export interface IComponentApplicationService
  extends ICRUDService<
      IComponentModel,
      ICreateComponentData,
      IUpdateComponentData
    >,
    IQueryService<IComponentModel, ComponentWhere, ComponentOptions>,
    ICRUDModalService<Ref<IComponentModel>, { component?: IComponentModel }>,
    IPaginateable<IComponentModel, { name?: string }> {
  componentDomainService: IComponentDomainService
  componentRepository: IComponentRepository
  createForm: IFormService

  getSelectComponentOptions(): Promise<Array<DefaultOptionType>>
  previewComponent(id: string): void
}
