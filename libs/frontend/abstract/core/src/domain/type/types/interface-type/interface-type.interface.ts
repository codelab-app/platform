import type { InterfaceTypeCreateInput } from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
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
  kind: ITypeKind.InterfaceType
  field(id: string): Maybe<IField>
  fields: Array<IField>
  defaultValues: IPropData
  deleteField(field: IField): void
  writeFieldCache(fields: Array<FieldFragment>): void
  load(fields: Array<FieldFragment>): void
  toCreateInput(): InterfaceTypeCreateInput
}

export type IInterfaceTypeRef = string
