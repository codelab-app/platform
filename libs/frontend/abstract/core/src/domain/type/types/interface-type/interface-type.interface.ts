import { ITypeKind } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { IPropData } from '../../../prop'
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
  ownerAuthId: string
  fields: Array<IField>
  fieldList: Array<IField>
  defaults: IPropData
  deleteField(field: IField): void
  writeFieldCache(fields: Array<IFieldDTO>): void
}

export type IInterfaceTypeRef = string
