import { IField } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'

export const getFieldLabel = (field: IField): string =>
  field.name || pascalCaseToWords(field.key)
