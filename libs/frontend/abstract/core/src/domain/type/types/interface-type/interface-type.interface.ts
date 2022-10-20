import { ITypeKind } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { IField } from '../../field'
import { IFieldDTO } from '../../field.dto.interface'
import { IBaseType } from '../base-type'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceType extends IBaseType {
  kind: ITypeKind.InterfaceType
  field(id: string): Maybe<IField>
  fields: Array<IField>
  deleteField(field: IField): void
  writeFieldCache(fields: Array<IFieldDTO>): void
}

export type IInterfaceTypeRef = string
