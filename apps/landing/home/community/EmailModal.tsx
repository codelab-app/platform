import type { ModalProps } from 'antd'
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { z } from 'zod'

interface EmailModalProps extends Omit<ModalProps, 'onOk'> {
  onOk: (email: string) => void
}

export const EmailModal = ({ open, onOk, onCancel }: EmailModalProps) => {
  const [email, setEmail] = useState('')
  const { success: isValid } = z.string().email().safeParse(email)

  return (
    <Modal
      destroyOnClose
      footer={null}
      onCancel={onCancel}
      open={open}
      title="Join The Community"
    >
      <div css={tw`container`}>
        <Input
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email"
          size="large"
          status={!isValid ? 'error' : undefined}
          type="text"
        />
        <Button
          css={tw`mx-auto block px-10 h-10 pt-1 mt-5 text-lg font-bold`}
          disabled={!isValid}
          onClick={() => onOk(email)}
          type="primary"
        >
          Join
        </Button>
      </div>
    </Modal>
  )
}
