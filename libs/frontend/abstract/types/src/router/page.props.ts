import type { Identity } from '@codelab/shared/abstract/types'
import type { ReactNode } from 'react'

import type { ParamProps } from './params.props'
import type {
  SearchParamProps,
  SearchParamsPageProps,
} from './search-params.props'
import type { UrlParams } from './url-params'

/**
 * Examples below
 */
export type PageProps<
  Params extends keyof UrlParams = never,
  SearchParams extends keyof SearchParamsPageProps = never,
> = ParamProps<Params> & SearchParamProps<SearchParams>

/**
 * Hover over `_WithParamsOnly` to see the fully computed type
 *
 * @deprecated
 */
type _WithParamsOnly = Identity<PageProps<'appId' | 'pageId'>>

/**
 * Hover over `_WithSearchParamsOnly` to see the fully computed type
 *
 * @deprecated
 */
type _WithSearchParamsOnly = Identity<PageProps<never, 'page' | 'pageSize'>>

/**
 * Hover over `_WithParamsAndSearchParams` to see the fully computed type
 *
 * @deprecated
 */
type _WithParamsAndSearchParams = Identity<
  PageProps<'appId' | 'fieldId', 'selectedKey'>
>
