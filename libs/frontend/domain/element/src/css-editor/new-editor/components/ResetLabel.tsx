import { UndoOutlined } from '@ant-design/icons'
import { Button, Col, Popover } from 'antd'

interface ResetLabelProps {
  canReset?: boolean
  label: string
  onReset?(): unknown
}

export const ResetLabel = ({ canReset, label, onReset }: ResetLabelProps) => {
  if (!canReset) {
    return (
      <span className="whitespace-nowrap p-[2px] text-[11px]">{label}</span>
    )
  }

  return (
    <Popover
      className="cursor-default text-[12px]"
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
      <span className="whitespace-nowrap rounded-[2px] bg-sky-100 p-[2px] text-[11px] hover:bg-sky-200">
        {label}
      </span>
    </Popover>
  )
}
