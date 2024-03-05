import type { CypressElement } from '../utils/types'
import { wrapSubject } from '../utils/utils'

export const selectOptionItem = (
  subject: any,
  label: string,
  text: string,
): CypressElement => {
  const cySubject = wrapSubject(subject)

  cySubject
    .findByLabelText(label)
    .click({ force: true })
    .type(text, { force: true })

  return cySubject.getOptionItem(text).first().click()
}
