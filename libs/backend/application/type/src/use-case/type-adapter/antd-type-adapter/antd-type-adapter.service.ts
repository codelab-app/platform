import type { AntDesignField } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import {
  EnumType,
  InterfaceType,
  TypeFactory,
  UnionType,
  UnionTypeRepository,
} from '@codelab/backend/domain/type'
import type {
  IAtomDTO,
  IAuth0Owner,
  IEnumTypeDTO,
  IInterfaceTypeDTO,
  ITypeDTO,
  IUnionTypeDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { AntDesignTypeMapper } from '../../../mapper'
import {
  isActionType,
  isEnumType,
  isInterfaceType,
  isPrimitiveType,
  isReactNodeType,
  isRenderPropType,
  isUnionType,
  parseSeparators,
} from '../../../parser'
import { DefaultTypeAdapterService } from '../default-type-adapter/default-type-adapter.service'

interface Request {
  atom: IAtomDTO
  field: Pick<AntDesignField, 'property' | 'type'>
  owner: IAuth0Owner
}

export class AntdTypeAdapterService extends DefaultTypeAdapterService {}
