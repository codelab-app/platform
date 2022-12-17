import { domClasses } from './domClasses'
import type { CypressElement } from './types'
import { wrapSubject } from './utils'

export const getOptionItem = (
  subject: any,
  text: string | RegExp,
): CypressElement =>
  wrapSubject(subject)
    .get(domClasses.dropdown)
    .findByText(text)
    .closest(domClasses.dropdownItem)
