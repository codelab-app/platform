import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { match } from 'path-to-regexp'

export type IBuilderPage = Pick<
  IPageModel,
  'builderUrlInstance' | 'slug' | 'urlPattern'
>

interface IPageQuery {
  page: IBuilderPage | null
  query: object
}

/**
 * Extract the query parameters from a dynamic URL, using the provided URL patterns.
 */
export const extractPathParamsFromUrlInstance = (
  pages: Array<IBuilderPage>,
  targetUrlInstance: string,
): IPageQuery => {
  for (const page of pages) {
    const urlMatch = match(page.urlPattern, {
      decode: decodeURIComponent,
    })

    const results = urlMatch(targetUrlInstance)

    if (results) {
      return { page, query: results.params }
    }
  }

  return { page: null, query: {} }
}
