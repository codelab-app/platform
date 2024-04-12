import { authGuardSelectionSet } from './auth-guard-selection-set'

export const redirectSelectionSet = `
  id
  source {
    id
  }
  targetType
  targetPage {
    id
    urlPattern
  }
  targetUrl
  authGuard {
    ${authGuardSelectionSet}
  }
`
