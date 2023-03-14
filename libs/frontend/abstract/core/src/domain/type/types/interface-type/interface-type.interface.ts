import type {
  InterfaceTypeCreateInput,
  InterfaceTypeUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import type { IPropData } from '../../../prop'
import type { IField } from '../../field'
import type { FieldFragment } from '../../fragments'
import type { IBaseType } from '../base-type'
import type { IInterfaceTypeDTO } from './interface-type.dto.interface'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceType extends IBaseType<IInterfaceTypeDTO> {
  defaultValues: IPropData
  fields: Array<IField>
  kind: ITypeKind.InterfaceType

  deleteField(field: IField): void
  field(id: string): Maybe<IField>
  load(fields: Array<FieldFragment>): void
  toCreateInput(): InterfaceTypeCreateInput
  toUpdateInput(): InterfaceTypeUpdateInput
  writeFieldCache(fields: Array<IEntity>): void
}

export type IInterfaceTypeRef = string
