import type { IRedirectModel } from '@codelab/frontend/abstract/domain'
import type { IRedirectDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import { PageRedirect } from './page-redirect.model'
import { UrlRedirect } from './url-redirect.model'

export const create = (redirectDTO: IRedirectDTO): IRedirectModel =>
  redirectDTO.__typename === IRedirectKind.Page
    ? PageRedirect.create(redirectDTO)
    : UrlRedirect.create(redirectDTO)

export const writeCache = (
  redirect: IRedirectModel,
  redirectDTO: IRedirectDTO,
): IRedirectModel => {
  switch (redirectDTO.__typename) {
    case IRedirectKind.Url:
      if (redirect.kind === IRedirectKind.Url) {
        redirect.writeCache(redirectDTO)
      }

      return redirect

    case IRedirectKind.Page:
      if (redirect.kind === IRedirectKind.Page) {
        redirect.writeCache(redirectDTO)
      }

      return redirect

    default:
      throw new Error(`Unknown redirect type : ${redirectDTO.__typename}`)
  }
}

export class RedirectFactory {
  static create = create

  static writeCache = writeCache
}
