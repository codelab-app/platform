import { Button, notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'

import { EmailModal } from './EmailModal'

type NotificationType = 'error' | 'success'

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
      <section className="bg-violet-700">
        <div className="m-auto w-11/12 py-12 2xl:w-11/12 lg:container">
          <h2
            className={`
              pt-7 text-center text-xl
              font-semibold leading-snug text-white
              lg:text-4xl
              md:pt-28 md:text-3xl
              sm:pt-14 sm:text-2xl
              xl:text-5xl
            `}
          >
            Join the Codelab community and help improve our product
          </h2>
          <p
            className={`
              mb-10 pt-5 text-center
              text-base text-white
              lg:text-xl
              sm:text-lg
              xl:text-2xl
            `}
          >
            Talk to other users to share your use cases, or contact one of the
            admins for instant support.
          </p>
          <Button
            className={`
              m-auto mb-6 flex
              items-center rounded-lg p-6
              lg:p-8
              md:mb-24
              sm:mb-12
              xl:p-10
            `}
            ghost
            onClick={() => {
              setShowEmailModal(true)
            }}
          >
            <a className="text-base font-bold text-white lg:text-xl">
              Join The Community
            </a>
          </Button>
        </div>
        <EmailModal
          onCancel={() => {
            setShowEmailModal(false)
          }}
          onOk={handleOk}
          open={showEmailModal}
        />
      </section>
    </>
  )
}
