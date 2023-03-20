import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { EnumTypeValueFragment } from '../../fragments'
import type { IBaseTypeDTO } from '../base-type'

export interface IEnumTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.EnumType}`
  allowedValues: Array<ICreateEnumTypeData>
}

export interface ICreateEnumTypeData {
  id: string
  key: string
  value: string
}

export type IEnumTypeValueDTO = EnumTypeValueFragment
