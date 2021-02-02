import React from 'react'
import { DashboardNavigationProps } from './Dashboard-navigation'
import { PropsWithRenderChildren, withRouterGuard } from '@codelab/frontend'
import { useGetPagesQuery } from '@codelab/generated'

interface DashboardNavigationContainerProps {
  appId: string
}
/**
 * Get pages & appId
 */
export const DashboardNavigationContainer = withRouterGuard(['appId'])(
  ({
    appId,
    children,
  }: PropsWithRenderChildren<
    DashboardNavigationContainerProps,
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
  },
)
