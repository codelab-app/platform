import type {
  ElementTypeCreateInput,
  ElementTypeUpdateInput,
  EnumTypeCreateInput,
  EnumTypeUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IBaseType } from '../base-type'
import type { IEnumTypeDTO } from './enum-type.dto.interface'

export interface IEnumTypeValue {
  id: string
  key: string
  label: string
  value: string
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 *
 * @property {IEnumTypeValue[]} allowedValues - The list of allowed values.
 */
export interface IEnumType extends IBaseType<IEnumTypeDTO> {
  allowedValues: Array<Ref<IEnumTypeValue>>
  kind: ITypeKind.EnumType

  toCreateInput(): EnumTypeCreateInput
  toUpdateInput(): EnumTypeUpdateInput
}
