import * as Types from '@codelab/shared/abstract/codegen'

export type RedirectFragment = {
  id: string
  targetType: Types.RedirectTargetType
  targetUrl?: string | null
  authGuard: { id: string }
  source: { id: string }
  targetPage?: { id: string } | null
}

export const RedirectFragmentDoc = `
    fragment Redirect on Redirect {
  authGuard {
    id
  }
  id
  source {
    id
  }
  targetPage {
    id
  }
  targetType
  targetUrl
}
    `
