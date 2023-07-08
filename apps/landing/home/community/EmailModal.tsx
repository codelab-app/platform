import type { ModalProps } from 'antd'
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { z } from 'zod'

interface EmailModalProps extends Omit<ModalProps, 'onOk'> {
  onOk(email: string): void
}

export const EmailModal = ({ onCancel, onOk, open }: EmailModalProps) => {
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
      <div className="container">
        <Input
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email"
          size="large"
          status={!isValid ? 'error' : undefined}
          type="text"
        />
        <Button
          className="mx-auto mt-5 block h-10 px-10 pt-1 text-lg font-bold"
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
