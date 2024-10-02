import type { IRef } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'

import type { ITypeRecord } from '../type'

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
  nextSibling?: IRef | null
  prevSibling?: IRef | null
  type?: {
    id: string
    kind: string
    name: string
  }
  validationRules?: Array<ValidationRuleTag>
}
