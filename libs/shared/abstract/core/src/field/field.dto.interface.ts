import type { IEntity } from '@codelab/shared/abstract/types'

/**
 * Props imply as input for something, in this case a model
 */
export interface IFieldDTO {
  api: IEntity
  defaultValues?: string | null
  description?: string | null
  fieldType: IEntity
  id: string
  key: string
  name?: string | null
  nextSibling?: IEntity | null
  prevSibling?: IEntity | null
  validationRules?: string | null
}
