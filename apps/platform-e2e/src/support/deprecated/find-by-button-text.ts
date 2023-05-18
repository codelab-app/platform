import type { SelectorMatcherOptions } from '@testing-library/cypress'
import type { ByRoleOptions } from '@testing-library/dom'
import type { CypressElement } from './types'
import { wrapSubject } from './utils'

export const findByButtonText = (
  subject: any,
  text: ByRoleOptions['name'],
  options?: SelectorMatcherOptions,
): CypressElement =>
  wrapSubject(subject).findByRole('button', {
    exact: false,
    name: text,
    timeout: 5000,
    ...options,
  })
