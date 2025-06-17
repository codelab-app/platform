import type { SelectOption } from '@codelab/frontend/abstract/types'
import type {
  IInterfaceTypeDto,
  IPrimitiveTypeKind,
  ITypeDto,
  ITypeKind,
} from '@codelab/shared-abstract-core'
import type { Maybe, Nullable } from '@codelab/shared-abstract-types'
import type { TypeFragment } from '@codelab/shared-infra-gqlgen'
import type { ObjectMap } from 'mobx-keystone'

import type { IHydrateable } from '../shared'
import type { IInterfaceTypeModel, ITypeModel } from './types'

export interface ITypeDomainService extends IHydrateable<ITypeDto, ITypeModel> {
  expandedNodes: Array<string>
  options: Array<SelectOption>
  selectedKey: Maybe<string>
  types: ObjectMap<ITypeModel>
  typesList: Array<ITypeModel>
  hydrateInterface(data: IInterfaceTypeDto): IInterfaceTypeModel
  hydrateTypes(types: Array<TypeFragment>): Array<ITypeModel>
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind>
  setExpandedNodes(nodes: Array<string>): void
  setSelectedKey(key: Maybe<string>): void
  type<T extends ITypeModel>(id: string): T
  typeByKind<T extends ITypeKind>(kind: T): ITypeModel
}
