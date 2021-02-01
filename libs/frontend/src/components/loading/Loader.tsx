import { Spin } from 'antd'
import { withRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { mapProps } from '@codelab/frontend'

export const Loader = () => {
  return <Spin />
}

const withQueryKeys = (queryKeys: Array<string>) => ({
  router,
  ...props
}: any) => {
  return queryKeys.reduce((mergedProps, queryKey) => {
    return {
      ...mergedProps,
      [queryKey]: router.query[queryKey],
    }
  }, props)
}

/**
 * @todo Add Spec for withRouterLoader
 * @body Mock the router according to nextjs router interface
 *
 * @param key query param that we want loaded before loading component
 */
export const withRouterGuard = (queryKeys: Array<string> = []) => (
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
