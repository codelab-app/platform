import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { ITypeRecord } from '../type.record.interface'

export interface ValidationRuleTag {
  key: string
  value: boolean | number | string
}

export interface IFieldRecord {
  dependentTypes: Array<ITypeRecord>
  description: Nullish<string>
  id: string
  key: string
  name: Nullish<string>
  nextSibling?: IEntity | null
  prevSibling?: IEntity | null
  type?: {
    id: string
    kind: string
    name: string
  }
  validationRules?: Array<ValidationRuleTag>
}
