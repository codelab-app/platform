import { domClasses } from './domClasses'
import { CypressElement } from './types'
import { wrapSubject } from './utils'

export const getSpinner = (subject: any): CypressElement =>
  wrapSubject(subject).get(domClasses.spinner)
