import type { ReactNode } from 'react'

import type { DashboardSlots } from './layout.props'
import type { SearchParamsClientProps } from './search-params.client.props'
import type { UrlParams } from './url-params'

export type SlotProps<SlotKey extends keyof DashboardSlots = never> = {
  [K in SlotKey]: ReactNode
}
