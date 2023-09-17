import { UndoOutlined } from '@ant-design/icons'
import { Button, Col, Popover } from 'antd'
import { useState } from 'react'

interface ResetLabelProps {
  canReset?: boolean
  label: string
  onReset?(): unknown
}

export const ResetLabel = ({ canReset, label, onReset }: ResetLabelProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover
      className="cursor-default text-[12px]"
      content={
        <Col className="space-y-1">
          <Button
            className="w-full flex-row justify-start"
            icon={<UndoOutlined />}
            onClick={() => {
              setOpen(false)
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
      open={open}
      trigger="click"
    >
      <span
        className={`p-[2px] ${
          canReset ? 'rounded-[2px] bg-sky-100 hover:bg-sky-200' : ''
        }`}
        onClick={() => setOpen(true)}
      >
        {label}
      </span>
    </Popover>
  )
}
