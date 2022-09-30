import { IBaseType } from '../base-type'
import { ITypeKind } from '../base-type/type-kind.enum'

export interface IEnumTypeValue {
  id: string
  key: string
  value: string
}

/**
 * Allows choosing one of a set of allowed values.
 * The value gets passed to the render pipe as a Enum Type Value id.
 * The actual value must be de-referenced by the id.
 *
 * @property {IEnumTypeValue[]} allowedValues - The list of allowed values.
 */
export interface IEnumType extends IBaseType {
  kind: ITypeKind.EnumType
  allowedValues: Array<IEnumTypeValue>
}
