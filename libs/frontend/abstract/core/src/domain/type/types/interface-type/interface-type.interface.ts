import { ITypeKind } from '@codelab/shared/abstract/core'
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
  ownerAuthId: string
  fieldList?: Array<IField>
  defaults: IPropData
}

export type IInterfaceTypeRef = string
