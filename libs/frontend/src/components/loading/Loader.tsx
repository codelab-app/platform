import { Spin } from 'antd'
import { withRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'

export const Loader = () => {
  return <Spin />
}

// TODO: remove any type
/**
 *
 * @param key query param that we want loaded before loading component
 */
export const withRouterLoader = (queryKey: string) => (Component: any) =>
  R.compose(
    withRouter,
    R.ifElse(
      ({ router }) => {
        return !!router?.query?.[queryKey]
      },
      Component,
      Loader,
    ),
  )
