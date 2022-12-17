import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { IPropData } from '../../../prop'
import type { IField } from '../../field'
import type { IFieldDTO } from '../../field.dto.interface'
import type { IBaseType } from '../base-type'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceType extends IBaseType {
  kind: ITypeKind.InterfaceType
  field(id: string): Maybe<IField>
  fields: Array<IField>
  defaultValues: IPropData
  deleteField(field: IField): void
  writeFieldCache(fields: Array<IFieldDTO>): void
}

export type IInterfaceTypeRef = string
