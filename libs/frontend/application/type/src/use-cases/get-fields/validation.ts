import type { ValidationRuleTag } from '@codelab/frontend-abstract-domain'
import type { IValidationRules } from '@codelab/shared-abstract-core'
import type { Nullish } from '@codelab/shared-abstract-types'

export const getValidationRuleTagsArray = (
  validationRules: Nullish<IValidationRules>,
) => {
  const rules: Array<ValidationRuleTag> = []

  if (!validationRules) {
    return rules
  }

  Object.entries(validationRules).forEach(([_, ruleCategory]) => {
    Object.entries(ruleCategory).forEach(([key, value]) => {
      rules.push({ key, value: value as boolean | number | string })
    })
  })

  return rules
}
