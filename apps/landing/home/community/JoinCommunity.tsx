import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import EmailModal from '../modal/EmailModal'

export const JoinCommunity = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false)

  const handleCancel = () => {
    setIsOpenModal(false)
  }

  const showModal = () => {
    setIsOpenModal(true)
  }

  return (
    <>
      <section css={tw`bg-violet-700`}>
        <div css={tw`m-auto w-11/12  lg:container 2xl:w-11/12 py-12`}>
          <h2
            css={tw`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-semibold pt-7 sm:pt-14 md:pt-28 text-center leading-snug`}
          >
            Join the Codelab community and help improve our product
          </h2>
          <p
            css={tw`text-base sm:text-lg lg:text-xl xl:text-2xl text-white pt-5 mb-10 text-center`}
          >
            Talk to other users to share your use cases, or contact one of the
            admins for instant support.
          </p>
          <Button
            css={tw`rounded-lg p-6 lg:p-8 xl:p-10 flex m-auto items-center mb-6 sm:mb-12 md:mb-24`}
            ghost
            onClick={showModal}
          >
            <a css={tw`text-base lg:text-xl text-white font-bold  `}>
              Join The Community
            </a>
          </Button>
        </div>
      </section>
      <EmailModal
        handleCancel={handleCancel}
        isOpenModal={isOpenModal}
        titleModal="Join The Community"
      />
    </>
  )
}
