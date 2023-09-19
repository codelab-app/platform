import { domClasses } from './dom-classes'
import type { CypressElement } from './types'
import { wrapSubject } from './utils'

export const getOptionItem = (
  subject: any,
  text: RegExp | string,
): CypressElement =>
  wrapSubject(subject)
    .get(domClasses.dropdown)
    .findByText(text)
    .closest(domClasses.dropdownItem)
