import { SelectorMatcherOptions } from '@testing-library/cypress'
import { ByRoleOptions } from '@testing-library/dom'
import { CypressElement } from './types'
import { wrapSubject } from './utils'

export const findByButtonText = (
  subject: any,
  text: ByRoleOptions['name'],
  options?: SelectorMatcherOptions,
): CypressElement =>
  wrapSubject(subject).findByRole('button', {
    name: text,
    exact: false,
    timeout: 5000,
    ...options,
  })
