import type {
  IComponentCreateResults,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import type {
  IComponentDto,
  ICreateComponentData,
  IRef,
  IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/infra/gql'
import type { Overwrite } from 'utility-types'

import type { IPaginateable } from '../services/pagination.service.interface'
import type {
  ICrudService,
  IQueryService,
} from '../services/query.service.interface'

export interface IComponentService
  extends Overwrite<
      ICrudService<IRef, ICreateComponentData, IUpdateComponentData>,
      { create(data: ICreateComponentData): Promise<IComponentCreateResults> }
    >,
    IQueryService<IComponentModel, ComponentWhere, ComponentOptions>,
    IPaginateable<IComponentModel> {
  // componentDevelopmentService: IComponentDevelopmentService
  // moved to builder
  // getSelectComponentOptions(): Promise<Array<DefaultOptionType>>
  importComponent(componentDataFile: File): Promise<Maybe<IComponentModel>>
  previewComponent(id: string): void
}
