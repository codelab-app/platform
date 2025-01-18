import type { UrlPathParams } from './url-path'
import type { UrlQueryParams } from './url-query'

/**
 * These are all required because we are in context where these have been validated and needed
 */

export type PageContextParams = Pick<UrlPathParams, 'appId' | 'pageId'>

export type ComponentContextParams = Pick<UrlPathParams, 'componentId'>

export type BuilderContextParams = PageContextParams & ComponentContextParams

export type PaginationContextParams = Pick<UrlQueryParams, 'page' | 'pageSize'>
