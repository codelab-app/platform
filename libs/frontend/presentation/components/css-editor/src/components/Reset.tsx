'use client'

import type { PropsWithChildren } from 'react'

import UndoOutlined from '@ant-design/icons/UndoOutlined'
import { Button, Col, Popover } from 'antd'

type ResetProps = PropsWithChildren & {
  onReset?(): unknown
}

export const Reset = ({ children, onReset }: ResetProps) => {
  return (
    <Popover
      className="cursor-default"
      content={
        <Col className="space-y-1">
          <Button
            className="w-full flex-row justify-start"
            icon={<UndoOutlined />}
            onClick={() => {
              onReset?.()
            }}
          >
            Reset
          </Button>
          <div
            style={{
              color: 'rgb(171, 171, 171)',
            }}
          >
            Resetting will revert to the initial value.
          </div>
        </Col>
      }
      trigger="click"
    >
      {children}
    </Popover>
  )
}
