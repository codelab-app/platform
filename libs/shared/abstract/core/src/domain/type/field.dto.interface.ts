import { IFieldRef } from './field'
import { FieldFragment } from './fragments'

export interface ICreateFieldDTO {
  id: IFieldRef
  key: string
  name: string | null
  description?: string | null
  // Type of field specified by an interface id
  interfaceType: IFieldRef
}

export type IUpdateFieldDTO = ICreateFieldDTO

export type IFieldDTO = FieldFragment
