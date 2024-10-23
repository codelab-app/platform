import type {
  IInterfaceTypeModel,
  ITypeCreateFormData,
  ITypeModel,
  ITypeUpdateDto,
} from '@codelab/frontend/abstract/domain'
import type {
  IBaseType,
  IBaseTypeOptions,
  IBaseTypeWhere,
} from '@codelab/shared/infra/gql'

import type { ICrudService, IPaginateable, IQueryService } from '../services'

export interface ITypeService
  extends ICrudService<ITypeModel, ITypeCreateFormData, ITypeUpdateDto>,
    Omit<IQueryService<ITypeModel, IBaseTypeWhere, IBaseTypeOptions>, 'getAll'>,
    IPaginateable<ITypeModel> {
  getAll(ids?: Array<string>): Promise<Array<ITypeModel>>
  getInterface(id: string): Promise<IInterfaceTypeModel>
  getOptions(): Promise<Array<Pick<IBaseType, 'id' | 'kind' | 'name'>>>
}
