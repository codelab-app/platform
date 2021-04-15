import { NextPage } from 'next'
import React from 'react'
import { HomeClients } from '../src/pages/home/Home-clients'
import { HomeFeatures } from '../src/pages/home/Home-features'
import { HomeJumbo } from '../src/pages/home/Home-jumbo'

const HomePage: NextPage = () => {
  return (
    <>
      {/* <div
        css={css({
          '.greeting': {
            color: 'hotpink',
          },
        })}
      >
        <div className="greeting">Hello World!</div>
      </div> */}
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

export default HomePage
