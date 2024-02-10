import type { GetTypesQuery } from '@codelab/shared/abstract/codegen'
import type { ICreateTypeDto, ITypeDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IHydrateable } from '../shared'
import type { IInterfaceTypeModel, ITypeModel } from './types'

export interface ITypeDomainService extends IHydrateable<ITypeDTO, ITypeModel> {
  types: ObjectMap<ITypeModel>
  typesList: Array<ITypeModel>

  hydrateInterface(data: ICreateTypeDto): IInterfaceTypeModel
  hydrateTypes(types: Partial<GetTypesQuery>): void
}
