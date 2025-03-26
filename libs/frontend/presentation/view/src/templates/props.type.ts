import type {
  SearchParamsPageProps,
  UrlParams,
} from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import type { DashboardSlots } from './Dashboard'
/**
 * Non-dashboard layout has no slots, only params
 *
 * The issue is that TypeScript is distributing the union type over the conditional type, resulting in a union of two separate promise types instead of a single promise with both properties.
 *
 * To fix this and get a merged type instead of a union, you can use square brackets in the conditional check to prevent distribution:
 *
 */
export type ParamProps<ParamKey extends keyof UrlParams = never> = [
  ParamKey,
] extends [never]
  ? {
      params?: never
    }
  : {
      params: Promise<{
        /**
         * We want to iterate through all possible keys, then set `never` to filter it out if we don't use it
         */
        [K in keyof UrlParams]: K extends ParamKey ? UrlParams[K] : never
      }>
    }

export type SearchParamProps<Key extends keyof SearchParamsPageProps = never> =
  [Key] extends [never]
    ? {
        params?: never
      }
    : {
        params: Promise<{
          /**
           * We want to iterate through all possible keys, then set `never` to filter it out if we don't use it
           */
          [K in keyof SearchParamsPageProps]: K extends Key
            ? SearchParamsPageProps[K]
            : never
        }>
      }

export type SlotProps<SlotKey extends keyof DashboardSlots = never> = {
  [K in SlotKey]: ReactNode
}
