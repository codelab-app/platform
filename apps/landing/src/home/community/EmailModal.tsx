import { Type } from '@sinclair/typebox'
import type { ModalProps } from 'antd'
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'

interface EmailModalProps extends Omit<ModalProps, 'onOk'> {
  onOk(email: string): void
}

export const EmailModal = ({ onCancel, onOk, open }: EmailModalProps) => {
  const [email, setEmail] = useState<string | undefined>()
  // Validate only if email is not empty, otherwise assume valid until typing starts
  const isValid = email && Type.String({ format: 'email' }).check(email)

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
          onClick={() => {
            if (email && isValid) {
              onOk(email)
            }
          }}
          type="primary"
        >
          Join
        </Button>
      </div>
    </Modal>
  )
}
