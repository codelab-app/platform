import { SelectorMatcherOptions } from '@testing-library/cypress'
import type { Matcher } from '@testing-library/dom'
import { CypressButton } from './types'
import { wrapSubject } from './utils'

/**
 * find button contained within a list item or table row by item text
 * @param subject
 * @param text text to resolve table record or list item
 * @param buttonClass to specify which button because
 *                    we may have many buttons contained by
 *                    the same list item or table row
 * @param containerClass the root class for list item or table row
 * @param options
 * @returns
 */
export const findButtonByItemText = (
  subject: any,
  text: Matcher,
  buttonClass: string,
  containerClass: string,
  options?: SelectorMatcherOptions,
): CypressButton =>
  wrapSubject(subject)
    .findByText(text, { exact: true, timeout: 0, ...options })
    .closest(containerClass)
    .find(buttonClass)
    .closest('button')
