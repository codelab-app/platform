import type { PageDevelopmentFragment } from '@codelab/shared/infra/gql'
import { IPageKind } from '@codelab/shared/abstract/core'

/**
 * Sort pages by kind and name using the following rules:
 * - `_app` always comes first
 * - then all regular pages sorted by `name`
 * - `404` always comes last but one
 * - `500` always comes last
 */
export const sortPagesByKindAndName = (
  pages: Array<PageDevelopmentFragment>,
) => {
  return pages.sort((a, b) => {
    // '_app' should always be first
    if (a.kind === IPageKind.Provider) {
      return -1
    }

    if (b.kind === IPageKind.Provider) {
      return 1
    }

    // '404' should always be last but one
    if (a.kind === IPageKind.NotFound) {
      return b.kind === IPageKind.InternalServerError ? -1 : 1
    }

    if (b.kind === IPageKind.NotFound) {
      return a.kind === IPageKind.InternalServerError ? 1 : -1
    }

    // '500' should always be last
    if (a.kind === IPageKind.InternalServerError) {
      return 1
    }

    if (b.kind === IPageKind.InternalServerError) {
      return -1
    }

    // All other pages should be sorted by `name`
    return a.name.localeCompare(b.name)
  })
}
