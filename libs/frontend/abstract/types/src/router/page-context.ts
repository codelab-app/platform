import type { Assign } from 'utility-types'

import type { SearchParamsContext } from './search-params'
import type { ValidatedUrlParamsProps } from './url-params'

/**
 * These are all required because we are in context where these have been validated and needed
 */

export type PageContextParams = Pick<
  ValidatedUrlParamsProps,
  'appId' | 'pageId'
>

export type ComponentContextParams = Pick<
  ValidatedUrlParamsProps,
  'componentId'
>

export type BuilderContextParams = ComponentContextParams | PageContextParams

export type PaginationContextParams = Pick<
  SearchParamsContext,
  'page' | 'pageSize'
>
