import { Nullish } from '@codelab/shared/abstract/types'
import { ITypeRecord } from '../type.record.interface'

export interface ValidationRuleTag {
  key: string
  value: string | number | boolean
}

export interface IFieldRecord {
  id: string
  name: Nullish<string>
  description: Nullish<string>
  key: string
  typeKind?: string
  validationRules?: Array<ValidationRuleTag>
  dependentTypes: Array<ITypeRecord>
}
