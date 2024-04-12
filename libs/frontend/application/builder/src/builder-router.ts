import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { PageType } from '@codelab/frontend/abstract/types'
import isNil from 'lodash/isNil'
import type { NextRouter } from 'next/router'
import { useRouter } from 'next/router'
import type { Key } from 'path-to-regexp'
import { match, pathToRegexp } from 'path-to-regexp'
import type { ParsedUrlQueryInput } from 'querystring'
import React, { useEffect } from 'react'

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
