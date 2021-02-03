import React from 'react'
import { BuilderNavigationProps } from './Builder-navigation'
import {
  PropsWithIds,
  PropsWithRenderChildren,
  withRouterGuard,
} from '@codelab/frontend'
import { useGetPagesQuery } from '@codelab/generated'

/**
 * Get pages & appId
 *
 */
export const _BuilderNavigationContainer = ({
  appId,
  children,
}: PropsWithRenderChildren<PropsWithIds<'appId'>, BuilderNavigationProps>) => {
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

export const BuilderNavigationContainer = withRouterGuard(['appId'])(
  _BuilderNavigationContainer,
)
