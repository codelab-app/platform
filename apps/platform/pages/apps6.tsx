import type { CodelabPage } from '@codelab/frontend/abstract/types'
import React from 'react'

const AppsPage: CodelabPage = () => {
  console.log('testing client-side log')

  return <>Hello world apps6</>
}

export default AppsPage

export const getServerSideProps = () => {
  console.log('testing server-side log')

  return { props: {} }
}

AppsPage.Layout = ({ children }) => <>{children()}</>

export const config = {
  maxDuration: 60,
}
