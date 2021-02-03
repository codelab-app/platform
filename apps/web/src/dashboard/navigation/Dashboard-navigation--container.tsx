import React from 'react'
import { DashboardNavigationProps } from './Dashboard-navigation'
import {
  PropsWithIds,
  PropsWithRenderChildren,
  withRouterGuard,
} from '@codelab/frontend'
import { useGetPagesQuery } from '@codelab/generated'

/**
 * Get pages & appId
 */
export const _DashboardNavigationContainer = ({
  appId,
  children,
}: PropsWithRenderChildren<
  PropsWithIds<'appId'>,
  DashboardNavigationProps
>) => {
  const { data } = useGetPagesQuery({
    variables: {
      input: {
        appId,
      },
    },
  })

  const pages = data?.getPages ?? []

  return <>{children ? <>{children({ pages, appId })}</> : null}</>
}

export const DashboardNavigationContainer = withRouterGuard(['appId'])(
  _DashboardNavigationContainer,
)
