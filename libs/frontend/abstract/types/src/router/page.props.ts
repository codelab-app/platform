import type { ReactNode } from 'react'

import type { ParamProps } from './params.props'
import type {
  SearchParamProps,
  SearchParamsPageProps,
} from './search-params.props'
import type { UrlParams } from './url-params'

export type PageProps<
  Params extends keyof UrlParams = never,
  SearchParams extends keyof SearchParamsPageProps = never,
> = ParamProps<Params> & SearchParamProps<SearchParams>

type _Demo = PageProps<'appId' | 'fieldId', 'selectedKey'>
