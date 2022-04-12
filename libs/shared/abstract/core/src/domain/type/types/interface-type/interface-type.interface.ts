import { IField } from '../../graph/type-edge.interface'
import { IBaseType } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceType extends IBaseType {
  typeKind: typeof TypeKind.InterfaceType
  fields: Array<IField>
}
