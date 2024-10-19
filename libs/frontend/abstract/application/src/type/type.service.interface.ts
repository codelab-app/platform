import type {
  IInterfaceTypeModel,
  ITypeModel,
  IUpdateTypeDto,
} from '@codelab/frontend/abstract/domain'
import type { ITypeCreateFormData } from '@codelab/shared/abstract/core'
import type {
  IBaseType,
  IBaseTypeOptions,
  IBaseTypeWhere,
} from '@codelab/shared/infra/gql'

import type { ICRUDService, IPaginateable, IQueryService } from '../services'

export interface ITypeService
  extends ICRUDService<ITypeModel, ITypeCreateFormData, IUpdateTypeDto>,
    Omit<IQueryService<ITypeModel, IBaseTypeWhere, IBaseTypeOptions>, 'getAll'>,
    IPaginateable<ITypeModel> {
  getAll(ids?: Array<string>): Promise<Array<ITypeModel>>
  getInterface(id: string): Promise<IInterfaceTypeModel>
  getOptions(): Promise<Array<Pick<IBaseType, 'id' | 'kind' | 'name'>>>
}
