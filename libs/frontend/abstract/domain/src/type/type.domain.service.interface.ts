import type { GetTypesQuery } from '@codelab/shared/abstract/codegen'
import type { ICreateTypeDto, ITypeDto } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IHydrateable } from '../shared'
import type { IInterfaceTypeModel, ITypeModel } from './types'

export interface ITypeDomainService extends IHydrateable<ITypeDto, ITypeModel> {
  types: ObjectMap<ITypeModel>
  typesList: Array<ITypeModel>

  getType(id: string): Maybe<ITypeModel>
  hydrateInterface(data: ICreateTypeDto): IInterfaceTypeModel
  hydrateTypes(types: Partial<GetTypesQuery>): void
}
