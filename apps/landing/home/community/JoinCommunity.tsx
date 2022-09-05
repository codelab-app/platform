import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export const JoinCommunity = () => {
  return (
    <section css={tw`bg-violet-700`}>
      <div css={tw`m-auto container py-12`}>
        <h2 css={tw`text-5xl text-white font-semibold pt-28 text-center`}>
          Join the Codelab community and help improve our product
        </h2>
        <p css={tw`text-2xl text-white pt-5 mb-10 text-center`}>
          Talk to other users to share your use cases, or contact one of the
          admins for instant support.
        </p>
        <Button css={tw`rounded-lg p-10 flex m-auto items-center mb-24`} ghost>
          <a css={tw`text-xl text-white font-bold  `}>Join The Community</a>
        </Button>
      </div>
    </section>
  )
}
