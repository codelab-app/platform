import type {
  IInterfaceTypeDto,
  IPrimitiveTypeKind,
  ITypeDto,
} from '@codelab/shared/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { GetTypesQuery } from '@codelab/shared/infra/gql'
import type { ObjectMap } from 'mobx-keystone'

import type { IHydrateable } from '../shared'
import type { IInterfaceTypeModel, ITypeModel } from './types'

export interface ITypeDomainService extends IHydrateable<ITypeDto, ITypeModel> {
  types: ObjectMap<ITypeModel>
  typesList: Array<ITypeModel>

  getType(id: string): Maybe<ITypeModel>
  hydrateInterface(data: IInterfaceTypeDto): IInterfaceTypeModel
  hydrateTypes(types: Partial<GetTypesQuery>): void
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind>
}
