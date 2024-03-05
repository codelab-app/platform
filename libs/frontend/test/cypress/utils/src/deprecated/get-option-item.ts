import { domClasses } from '../utils/dom-classes'
import type { CypressElement } from '../utils/types'
import { wrapSubject } from '../utils/utils'

export const getOptionItem = (
  subject: any,
  text: RegExp | string,
): CypressElement =>
  wrapSubject(subject)
    .get(domClasses.dropdown)
    .findByText(text)
    .closest(domClasses.dropdownItem)
