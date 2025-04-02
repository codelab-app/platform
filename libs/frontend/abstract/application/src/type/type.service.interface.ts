import type {
  IInterfaceTypeModel,
  ITypeCreateFormData,
  ITypeModel,
  ITypeUpdateDto,
} from '@codelab/frontend/abstract/domain'
import type { IPopover } from '@codelab/frontend/abstract/types'
import type {
  IBaseType,
  IBaseTypeOptions,
  IBaseTypeWhere,
} from '@codelab/shared/infra/gqlgen'

import type { ICrudService, IQueryService } from '../services'
import type { ITypeCreateRoute, ITypeUpdateRoute } from './type.route.interface'

export interface ITypeService
  extends ICrudService<ITypeModel, ITypeCreateFormData, ITypeUpdateDto>,
    Omit<
      IQueryService<ITypeModel, IBaseTypeWhere, IBaseTypeOptions>,
      'getAll'
    > {
  createPopover: IPopover<ITypeCreateRoute, ITypeCreateRoute>
  updatePopover: IPopover<ITypeUpdateRoute, ITypeUpdateRoute>
  deleteType(type: ITypeModel): Promise<void>
  getAll(ids?: Array<string>): Promise<Array<ITypeModel>>
  getInterface(id: string): Promise<IInterfaceTypeModel>
  getSelectOptions(): Promise<Array<Pick<IBaseType, 'id' | 'kind' | 'name'>>>
}
