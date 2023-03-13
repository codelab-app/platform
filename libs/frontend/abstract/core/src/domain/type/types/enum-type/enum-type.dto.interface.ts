import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { EnumTypeValueFragment } from '../../fragments'
import type { IBaseTypeDTO } from '../base-type'

export interface IEnumTypeDTO extends IBaseTypeDTO {
  __typename: `${ITypeKind.EnumType}`
  allowedValues: Array<IEntity>
}

export interface ICreateEnumTypeData {
  id: string
  key: string
  value: string
}

export type IEnumTypeValueDTO = EnumTypeValueFragment
