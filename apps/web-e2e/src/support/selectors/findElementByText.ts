import { Matcher, SelectorMatcherOptions } from '@testing-library/dom'
import { CypressElementTag, ElementTagName } from './types'
import { wrapSubject } from './utils'

/**
 * find the closest element tag which contains text
 * @param subject
 * @param text
 * @param element
 * @param options
 * @returns
 */

export const findElementByText = <K extends ElementTagName>(
  subject: any,
  text: Matcher,
  element: K,
  options?: SelectorMatcherOptions,
): CypressElementTag<K> =>
  wrapSubject(subject)
    .findByText(text, { exact: true, timeout: 5000, ...options })
    .closest<K>(element)
