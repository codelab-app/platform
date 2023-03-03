import { Button, notification } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { EmailModal } from './EmailModal'

type NotificationType = 'success' | 'error'

export const JoinCommunity = () => {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type: NotificationType) => {
    const message =
      type === 'success' ? 'Thanks for joining!' : 'Something went wrong'

    api[type]({
      duration: 3,
      message: message,
    })
  }

  const handleOk = async (email: string) => {
    try {
      await axios.post('/api/community/email', {
        email: email,
      })
    } catch (error) {
      openNotificationWithIcon('error')

      return
    }

    setShowEmailModal(false)
    openNotificationWithIcon('success')
  }

  return (
    <>
      {contextHolder}
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
            onClick={() => setShowEmailModal(true)}
          >
            <a css={tw`text-base lg:text-xl text-white font-bold`}>
              Join The Community
            </a>
          </Button>
        </div>
        <EmailModal
          onCancel={() => setShowEmailModal(false)}
          onOk={handleOk}
          open={showEmailModal}
        />
      </section>
    </>
  )
}
