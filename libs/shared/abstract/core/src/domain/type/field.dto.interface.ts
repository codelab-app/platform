import { IFieldRef } from './field'
import { FieldFragment } from './fragments'

export interface ICreateFieldDTO {
  id: IFieldRef
  key: string
  name: string | null
  description?: string | null
  // Type of field specified by an interface id
  fieldType: IFieldRef
}

export type IUpdateFieldDTO = ICreateFieldDTO

export type IDeleteFieldDTO = {
  id: IFieldRef
}

export type IFieldDTO = FieldFragment
