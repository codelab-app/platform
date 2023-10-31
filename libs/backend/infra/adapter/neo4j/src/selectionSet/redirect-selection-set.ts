import { authGuardSelectionSet } from './auth-guard-selection-set'

export const redirectSelectionSet = `
  id
  name
  source {
    id
  }
  targetType

  targetPage {
    id
  }
  targetUrl

  authGuard {
    ${authGuardSelectionSet}
  }
`
