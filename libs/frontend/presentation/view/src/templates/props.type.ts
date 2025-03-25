import type { UrlParams } from '@codelab/frontend/abstract/types'
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ReactNode } from 'react'

import type { DashboardLayoutProps, DashboardSlots } from './Dashboard'
/**
 * Non-dashboard layout has no slots, only params
 *
 * The issue is that TypeScript is distributing the union type over the conditional type, resulting in a union of two separate promise types instead of a single promise with both properties.
 *
To fix this and get a merged type instead of a union, you can use square brackets in the conditional check to prevent distribution:
 */
export type ParamProps<ParamKey extends keyof UrlParams = never> = [
  ParamKey,
] extends [never]
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {
      params?: Promise<Pick<UrlParams, ParamKey>>
    }
  : {
      params: Promise<Pick<UrlParams, ParamKey>>
    }

export type SlotProps<SlotKey extends keyof DashboardSlots = never> = {
  [K in SlotKey]: ReactNode
}
