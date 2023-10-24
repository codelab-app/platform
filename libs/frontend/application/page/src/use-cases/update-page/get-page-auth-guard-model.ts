import type {
  IPageModel,
  IUpdatePageAuthGuardData,
} from '@codelab/frontend/abstract/domain'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'

export const getPageAuthGuardModel = (
  page: Maybe<IPageModel>,
): Nullish<IUpdatePageAuthGuardData> => {
  const authGuard = page?.authGuard

  if (!authGuard) {
    return undefined
  }

  const { redirect } = authGuard

  // we need to clone it and not pass mobx object directly
  return {
    authGuard: { id: authGuard.authGuard.id },
    id: authGuard.id,
    redirect: {
      id: redirect.id,
      kind: redirect.kind,
      // empty values to avoid typing issue
      page:
        redirect.kind === IRedirectKind.PageRedirect
          ? { id: redirect.page.id }
          : { id: '' },
      url: redirect.kind === IRedirectKind.UrlRedirect ? redirect.url : '',
    },
  }
}
