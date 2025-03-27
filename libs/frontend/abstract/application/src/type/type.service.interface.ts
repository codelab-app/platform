import type {
  IInterfaceTypeModel,
  ITypeCreateFormData,
  ITypeModel,
  ITypeUpdateDto,
} from '@codelab/frontend/abstract/domain'
import type { IPopover, TreeViewSearchParams } from '@codelab/frontend/abstract/types'
import type {
  IBaseType,
  IBaseTypeOptions,
  IBaseTypeWhere,
} from '@codelab/shared/infra/gqlgen'

import type { ICrudService, IQueryService } from '../services'

export interface ITypeService
  extends ICrudService<ITypeModel, ITypeCreateFormData, ITypeUpdateDto>,
    Omit<
      IQueryService<ITypeModel, IBaseTypeWhere, IBaseTypeOptions>,
      'getAll'
    > {
  createPopover: IPopover<TreeViewSearchParams, TreeViewSearchParams>
  updatePopover: IPopover<TreeViewSearchParams, TreeViewSearchParams>
  getAll(ids?: Array<string>): Promise<Array<ITypeModel>>
  getInterface(id: string): Promise<IInterfaceTypeModel>
  getSelectOptions(): Promise<Array<Pick<IBaseType, 'id' | 'kind' | 'name'>>>
}
