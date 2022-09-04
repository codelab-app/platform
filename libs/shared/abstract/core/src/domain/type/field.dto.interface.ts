import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import { IFieldRef } from './field'
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

export type IFieldDTO = FieldFragment

export type IFieldExport = OGM_TYPES.Field
