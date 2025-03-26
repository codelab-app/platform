import type {
  SearchParamsPageProps,
  UrlParams,
} from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import type { ParamProps } from './props.type'

/**
 * Non-dashboard layout has no slots, only params
 */
export type LayoutProps<Params extends keyof UrlParams = never> =
  ParamProps<Params> & {
    children: ReactNode
  }

export type PageProps<
  Params extends keyof UrlParams = never,
  SearchParams extends keyof SearchParamsPageProps = never,
> = ParamProps<Params>
