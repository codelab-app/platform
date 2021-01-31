import { Spin } from 'antd'
import * as R from 'ramda'
import React from 'react'

export const Loader = () => {
  return <Spin />
}

/**
 *
 * @param key query param that we want loaded before loading component
 */
export const withRouterLoader = (queryKey: string) => (Component: any) =>
  R.ifElse(
    ({ router }) => {
      return !!router?.query?.[queryKey]
    },
    Component,
    Loader,
  )
