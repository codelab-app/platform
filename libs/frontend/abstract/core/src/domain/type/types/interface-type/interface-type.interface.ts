import { ITypeKind } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap } from 'mobx-keystone'
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
  fields: ObjectMap<IField>
  field(id: string): Maybe<IField>
  ownerAuthId: string
  fieldList?: Array<IField>
  defaults: IPropData
  deleteFieldLocal(field: IField): void
}

export type IInterfaceTypeRef = string
