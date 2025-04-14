import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type {
  ICreateComponentData,
  IRef,
  IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/infra/gqlgen'
import type { Overwrite } from 'utility-types'

import type {
  ICrudService,
  IQueryService,
} from '../services/query.service.interface'

export interface IComponentService
  extends Overwrite<
      ICrudService<IRef, ICreateComponentData, IUpdateComponentData>,
      { create(data: ICreateComponentData): Promise<IComponentModel> }
    >,
    IQueryService<IComponentModel, ComponentWhere, ComponentOptions> {
  // componentDevelopmentService: IComponentDevelopmentService
  // moved to builder
  // getSelectComponentOptions(): Promise<Array<DefaultOptionType>>
  createWithoutRoot(
    data: ICreateComponentData,
    rootElement: IElementModel,
  ): Promise<IComponentModel>
  importComponent(componentDataFile: File): Promise<Maybe<IComponentModel>>
  previewComponent(id: string): void
}
