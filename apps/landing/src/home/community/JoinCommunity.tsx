'use client'

import { Button, notification } from 'antd'
import axios from 'axios'
import { useState } from 'react'

import { CuiContainer } from '../../components/CuiContainer'
import { CuiText } from '../../components/CuiText'
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
        <CuiContainer
          className={`
            py-12
            2xl:w-11/12
          `}
          size="lg"
        >
          <CuiText
            className={`
              pt-7 leading-snug
              sm:pt-14
              md:pt-28
            `}
            color="white"
            variant="section-title"
          >
            Join the Codelab community and help improve our product
          </CuiText>
          <p
            className={`
              mb-10 pt-5 text-center text-base text-white
              sm:text-lg
              lg:text-xl
              xl:text-2xl
            `}
          >
            Talk to other users to share your use cases, or contact one of the
            admins for instant support.
          </p>
          <div className="flex justify-center">
            <Button
              className={`
                mb-6 h-auto rounded-full border-2 border-white bg-transparent px-12 py-10 text-xl font-bold text-white transition-all
                hover:!border-white hover:!bg-white hover:!text-violet-700
                sm:mb-12 sm:px-16 sm:py-12 sm:text-2xl
                md:mb-24
                lg:px-20 lg:py-14 lg:text-3xl
                xl:px-24 xl:py-16 xl:text-4xl
              `}
              ghost
              onClick={() => {
                setShowEmailModal(true)
              }}
              size="large"
            >
              Join The Community
            </Button>
          </div>
        </CuiContainer>
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
