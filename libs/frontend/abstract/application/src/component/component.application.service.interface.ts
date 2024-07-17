import type {
  IComponentDevelopmentService,
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
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
import type { Ref } from 'mobx-keystone'
import type { IFormService } from '../services/form.service.interface'
import type { ICRUDModalService } from '../services/modal.service.interface'
import type { IPaginateable } from '../services/pagination.service.interface'
import type {
  ICRUDService,
  IQueryService,
} from '../services/query.service.interface'
import type { IComponentRepository } from '../../../domain/src/component/component.repo.interface'

export interface IComponentApplicationService
  extends ICRUDService<
      IComponentModel,
      ICreateComponentData,
      IUpdateComponentData
    >,
    IQueryService<IComponentModel, ComponentWhere, ComponentOptions>,
    ICRUDModalService<Ref<IComponentModel>, { component?: IComponentModel }>,
    IPaginateable<IComponentModel, { name?: string }> {
  componentDevelopmentService: IComponentDevelopmentService
  componentDomainService: IComponentDomainService
  componentRepository: IComponentRepository
  createForm: IFormService

  getSelectComponentOptions(): Promise<Array<DefaultOptionType>>
  importComponent(componentDataFile: File): Promise<Maybe<IComponentModel>>
  previewComponent(id: string): void
}
