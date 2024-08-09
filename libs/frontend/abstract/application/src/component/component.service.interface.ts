import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/infra/gql'
import type {
  ICreateComponentData,
  IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { IPaginateable } from '../services/pagination.service.interface'
import type {
  ICRUDService,
  IQueryService,
} from '../services/query.service.interface'

export interface IComponentService
  extends ICRUDService<
      IComponentModel,
      ICreateComponentData,
      IUpdateComponentData
    >,
    IQueryService<IComponentModel, ComponentWhere, ComponentOptions>,
    IPaginateable<IComponentModel, { name?: string }> {
  // componentDevelopmentService: IComponentDevelopmentService
  // moved to builder
  // getSelectComponentOptions(): Promise<Array<DefaultOptionType>>
  importComponent(componentDataFile: File): Promise<Maybe<IComponentModel>>
  previewComponent(id: string): void
}
