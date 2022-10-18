import { ITypeKind } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { IPropData } from '../../../prop'
import { IField } from '../../field'
import { IBaseType } from '../base-type'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceType extends IBaseType {
  kind: ITypeKind.InterfaceType
  // fields: ObjectMap<IField>
  field(id: string): Maybe<IField>
  ownerAuthId: string
  fields: Array<IField>
  defaults: IPropData
  deleteField(field: IField): void
}

export type IInterfaceTypeRef = string
