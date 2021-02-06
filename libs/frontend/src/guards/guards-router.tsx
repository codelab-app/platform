import { Spin } from 'antd'
import { WithRouterProps } from 'next/dist/client/with-router'
import { useRouter, withRouter } from 'next/router'
import * as R from 'ramda'
import React, { PropsWithChildren } from 'react'
import { ModelIds, PropsWithIds } from '../interfaces'
import { PropsWithRenderChildren, mapProps } from '@codelab/frontend'

export const Loader = () => {
  return <Spin />
}

const withQueryKeys = (queryKeys: Array<ModelIds>) => ({
  router,
  ...props
}: WithRouterProps) => {
  return queryKeys.reduce((mergedProps, queryKey) => {
    return {
      ...mergedProps,
      [queryKey]: router.query[queryKey],
    }
  }, props)
}

/**
 * @param key query param that we want loaded before loading component
 */
export const withRouterGuard = (queryKeys: Array<ModelIds> = []) => (
  Component: any,
) =>
  R.compose(withRouter)(
    R.ifElse(
      ({ router }) => {
        // Check each queryKey exists in router
        return queryKeys.reduce(
          (hasKey, queryKey) => hasKey && router?.query[queryKey],
          true,
        )
      },
      // Extract query keys to props
      mapProps(withQueryKeys(queryKeys))(Component),
      Loader,
    ),
  )

type RouterGuardProps = PropsWithChildren<{ guards: Array<ModelIds> }>

/**
 * Component to guard for router query keys
 *
 * @param props
 */
export const RouterGuard = <T extends ModelIds = ''>({
  guards,
  children,
}: PropsWithRenderChildren<RouterGuardProps, PropsWithIds<T>>) => {
  const router = useRouter()

  const canActivate = guards.reduce(
    (exists: boolean, modelId: string) => exists && !!router?.query[modelId],
    true,
  )

  const propsWithIds: PropsWithIds<T> = guards.reduce(
    (mergedProps, queryKey) => {
      return {
        ...mergedProps,
        [queryKey]: router.query[queryKey],
      }
    },
    {} as PropsWithIds<T>,
  )

  return <>{canActivate ? <>{children(propsWithIds)}</> : null}</>
}
