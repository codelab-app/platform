import type { UrlPathParams } from './url-path'
import type { UrlQueryParams } from './url-query'

/**
 * These are all required because we are in context where these have been validated and needed
 */

export type PageContextParams = Pick<
  Required<UrlPathParams>,
  'appId' | 'pageId'
>

export type ComponentContextParams = Pick<
  Required<UrlPathParams>,
  'componentId'
>

export type PaginationContextParams = Pick<
  Required<UrlQueryParams>,
  'page' | 'pageSize'
>
