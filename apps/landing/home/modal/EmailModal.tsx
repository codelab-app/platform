import { Button, Modal, notification } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import joinCommunity from '../community/api/mailChimp'

export interface ModalProps {
  titleModal: string
  handleCancel: () => void
  isOpenModal: boolean
}

export default function EmailModal(props: ModalProps) {
  const [inputEmail, setInputEmail] = React.useState('')
  const [invalidEmail, setInvalidEmail] = React.useState(false)
  const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/

  const handleSubmit = async () => {
    if (regexEmail.test(inputEmail)) {
      try {
        await joinCommunity({
          email: inputEmail,
        })
          .then((value) => {
            props.handleCancel()
            notification.success({
              message: value.result,
              description: 'Thanks for Join Community',
            })
            setInputEmail('')
          })
          .catch((error) =>
            notification.error({
              message: error.result,
              description: error.msg,
            }),
          )
      } catch (error: unknown) {
        if (typeof error === 'string') {
          console.log(error)

          console.log(error.toUpperCase())
        } else if (error instanceof Error) {
          console.log(error)
        }
      }
    } else {
      setInvalidEmail(true)
    }
  }

  return (
    <>
      <Modal
        bodyStyle={tw`pb-6`}
        centered
        footer={[
          <div css={tw`px-2`} key={props.titleModal}>
            <Button
              css={tw`text-lg w-[120px] h-[40px]`}
              onClick={props.handleCancel}
            >
              Cancel
            </Button>
            <Button
              css={tw`text-lg w-[120px] h-[40px]`}
              onClick={() => handleSubmit()}
              type="primary"
            >
              Send Email
            </Button>
          </div>,
        ]}
        onCancel={props.handleCancel}
        open={props.isOpenModal}
        title={props.titleModal}
        width="600px"
      >
        <div css={tw` text-lg pt-2 flex items-center justify-between`}>
          <p css={tw`mb-0`}>Email address: </p>
          <input
            css={tw`w-[77%] p-2 `}
            onChange={(e) => {
              setInputEmail(e.target.value)
              setInvalidEmail(false)
            }}
            placeholder="Enter your email"
            required
            type="email"
            value={inputEmail}
          />
        </div>
        <p
          css={[
            tw`text-lg text-red-600 mb-0 mt-2 ml-[128px]`,
            invalidEmail ? tw`block` : tw`hidden`,
          ]}
        >
          You have entered an invalid email address!!!
        </p>
      </Modal>
    </>
  )
}
