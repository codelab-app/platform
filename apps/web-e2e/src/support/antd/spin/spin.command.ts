import { domClasses } from '../../selectors/domClasses'
import { CypressElement } from '../../selectors/types'
import { wrapSubject } from '../../selectors/utils'

export const getSpinner = (subject: any): CypressElement =>
  wrapSubject(subject).get(domClasses.spinner)
