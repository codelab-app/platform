import type { ReactNode } from 'react'

import type { DashboardSlots } from './layout.props'
import type { SearchParamsPageProps } from './search-params.props'
import type { UrlParams } from './url-params'

export type SlotProps<SlotKey extends keyof DashboardSlots = never> = {
  [K in SlotKey]: ReactNode
}
