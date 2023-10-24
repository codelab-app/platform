import type {
  ICreateRedirectData,
  IRedirectModel,
} from '@codelab/frontend/abstract/domain'
import type { IRedirectDTO } from '@codelab/shared/abstract/core'
import {
  assertIsRedirectKind,
  IRedirectKind,
} from '@codelab/shared/abstract/core'
import { PageRedirect } from './page-redirect.model'
import { UrlRedirect } from './url-redirect.model'

export const mapDataToDto = ({
  id,
  kind,
  page,
  url,
}: ICreateRedirectData): IRedirectDTO => ({
  __typename: kind,
  id,
  kind,
  page,
  url,
})

export const create = (redirectDTO: IRedirectDTO): IRedirectModel => {
  switch (redirectDTO.__typename) {
    case IRedirectKind.UrlRedirect:
      return UrlRedirect.create(redirectDTO)

    case IRedirectKind.PageRedirect:
      return PageRedirect.create(redirectDTO)

    default:
      throw new Error(`Unknown redirect type : ${redirectDTO.__typename}`)
  }
}

export const writeCache = (
  redirect: IRedirectModel,
  redirectDTO: IRedirectDTO,
): IRedirectModel => {
  // redirect type changed we need to create a new instance
  if (redirect.kind !== redirectDTO.__typename) {
    return create(redirectDTO)
  }

  if (redirectDTO.__typename === IRedirectKind.PageRedirect) {
    assertIsRedirectKind<IRedirectKind.PageRedirect>(
      redirect.kind,
      IRedirectKind.PageRedirect,
    )

    return redirect.writeCache(redirectDTO)
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (redirectDTO.__typename === IRedirectKind.UrlRedirect) {
    assertIsRedirectKind<IRedirectKind.UrlRedirect>(
      redirect.kind,
      IRedirectKind.UrlRedirect,
    )

    return redirect.writeCache(redirectDTO)
  }

  throw new Error('Unable to write cache')
}

export class RedirectFactory {
  static create = create

  static mapDataToDTO = mapDataToDto

  static writeCache = writeCache
}
