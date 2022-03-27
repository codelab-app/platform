import { domClasses } from '../../deprecated/domClasses'
import { CypressElement } from '../../deprecated/types'
import { wrapSubject } from '../../deprecated/utils'

export const getSpinner = (subject: any): CypressElement =>
  wrapSubject(subject).get(domClasses.spinner)
