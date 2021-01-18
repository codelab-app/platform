import * as R from 'ramda'
import React from 'react'
import { HomeClients } from '../src/home/Home-clients'
import { HomeFeatures } from '../src/home/Home-features'
import { HomeJumbo } from '../src/home/Home-jumbo'
import { withApollo } from '@codelab/frontend'

const HomePage = (props: any) => {
  // const { data } = ssrGetMe.usePage()

  return (
    <>
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

// Can't use SSR need browser access
// export const getServerSideProps = async () => {
//   return  await ssrGetMe.getServerPage({})
// }

export default R.pipe(withApollo, HomePage)
