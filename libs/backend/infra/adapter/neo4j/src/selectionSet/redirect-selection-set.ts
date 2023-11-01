import { authGuardSelectionSet } from './auth-guard-selection-set'

export const redirectSelectionSet = `
  id
  source {
    id
  }
  targetType

  targetPage {
    id
    url
  }
  targetUrl

  authGuard {
    ${authGuardSelectionSet}
  }
`
