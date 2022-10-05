import { ITypeKind } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap } from 'mobx-keystone'
import { IField } from '../../field'
import { IBaseType } from '../base-type'

/**
 * Represent an object type with multiple fields
 *
 * @property fields {@link IField[]} - Fields of the object type
 */
export interface IInterfaceType extends IBaseType {
  kind: ITypeKind.InterfaceType
  fields: ObjectMap<IField>
  field(id: string): Maybe<IField>
  fieldList?: Array<IField>
  deleteFieldLocal(field: IField): void
}

export type IInterfaceTypeRef = string
