import type { ITypeDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { ICreateTypeData } from './type.data.interface'
import type { IInterfaceTypeModel, ITypeModel } from './types'

export interface ITypeDomainService {
  types: ObjectMap<ITypeModel>
  typesList: Array<ITypeModel>

  hydrate(type: ITypeDTO): ITypeModel
  hydrateInterface(data: ICreateTypeData): IInterfaceTypeModel
}
