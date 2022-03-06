import { domClasses } from './domClassess'
import { CypressElement } from './types'
import { wrapSubject } from './utils'

export const getSpinner = (subject: any): CypressElement =>
  wrapSubject(subject).get(domClasses.spinner)
