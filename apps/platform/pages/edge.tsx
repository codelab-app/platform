import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { logDatetime } from '@codelab/shared/infra/logging'
import type { GetServerSidePropsContext } from 'next'
import React from 'react'

const AppsPage: CodelabPage = () => {
  logDatetime('testing client-side log')

  return <>Demo</>
}

export default AppsPage

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  logDatetime('testing server-side log')

  return { props: {} }
}

AppsPage.Layout = ({ children }) => <>{children()}</>

export const config = {
  maxDuration: 60,
  runtime: 'experimental-edge',
}
