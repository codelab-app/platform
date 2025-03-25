import type { UrlParams } from '@codelab/frontend/abstract/types'
import type { PropsWithChildren, ReactNode } from 'react'

import type { DashboardSlots } from './Dashboard'
import type { ParamProps, SlotProps } from './props.type'

/**
 * Non-dashboard layout has no slots, only params
 */
export type LayoutProps<Params extends keyof UrlParams = never> =
  ParamProps<Params> & {
    children: ReactNode
  }

export type PageProps<Params extends keyof UrlParams = never> =
  ParamProps<Params>
