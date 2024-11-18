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

import type { IPaginateable } from '../services/pagination.service.interface'
import type {
  ICrudService,
  IQueryService,
} from '../services/query.service.interface'

export interface IComponentService
  extends Overwrite<
      ICrudService<IRef, ICreateComponentData, IUpdateComponentData>,
      {
        /** ***********  ✨ Codeium Command ⭐  ************ */
        /**
         * Create a component with the given data. If `createRootElement` is true, creates
         * a root element for the component. If `createRootElement` is false, returns
         * `undefined`.
         *
         * @param data The component data.
         * @param createRootElement Whether to create a root element for the component.
         * @returns The created component model.
         */
        /** ****  3e0bb368-082d-46da-ac3c-c93c386f0bf7  ****** */
        create(
          data: ICreateComponentData,
          createRootElement?: boolean,
        ): Promise<IComponentModel>
      }
    >,
    IQueryService<IComponentModel, ComponentWhere, ComponentOptions>,
    IPaginateable<IComponentModel> {
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
