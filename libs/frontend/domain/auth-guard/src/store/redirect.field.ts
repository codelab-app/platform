import type { IRedirectModel } from '@codelab/frontend/abstract/domain'
import { pageRef, urlRef } from '@codelab/frontend/abstract/domain'
import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'

export const getRedirect = (
  redirect: IAuthGuardDTO['redirect'],
): IRedirectModel => {
  switch (redirect.__typename) {
    case IRedirectKind.Page: {
      return pageRef(redirect.id)
    }

    case IRedirectKind.Url: {
      return urlRef(redirect.id)
    }

    default: {
      throw new Error('Missing __typename')
    }
  }
}
