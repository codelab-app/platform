import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import { IField, IFieldRef } from './field'
import { FieldFragment } from './fragments'
import { IInterfaceTypeRef } from './types'

export interface ICreateFieldDTO {
  id: IFieldRef
  key: string
  name?: Nullish<string>
  description?: Nullish<string>
  // Type of field specified by an interface id
  fieldType: IInterfaceTypeRef
}

export type IUpdateFieldDTO = ICreateFieldDTO

export interface IDeleteFieldDTO {
  id: IFieldRef
}

/**
 * Props imply as input for something, in this case a model
 */
export type IFieldProps = FieldFragment

export type IFieldDTO = Omit<IField, 'writeCache'>

export type IFieldExport = OGM_TYPES.Field
