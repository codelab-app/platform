import { IField } from '../../field'
import { IBaseType } from '../base-type'
import { ITypeKind } from '../base-type/type-kind.enum'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceType extends IBaseType {
  kind: ITypeKind.InterfaceType
  fields: Array<IField>
}
