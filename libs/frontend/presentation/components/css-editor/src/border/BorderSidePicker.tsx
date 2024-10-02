import BorderBottomOutlined from '@ant-design/icons/BorderBottomOutlined'
import BorderLeftOutlined from '@ant-design/icons/BorderLeftOutlined'
import BorderOuterOutlined from '@ant-design/icons/BorderOuterOutlined'
import BorderRightOutlined from '@ant-design/icons/BorderRightOutlined'
import BorderTopOutlined from '@ant-design/icons/BorderTopOutlined'
import { Radio } from 'antd'
import clsx from 'clsx'

import { Side } from '../utils'
import classes from './borderStyle.module.css'

const sideToIcon = {
  [Side.Bottom]: <BorderBottomOutlined />,
  [Side.Center]: <BorderOuterOutlined />,
  [Side.Left]: <BorderLeftOutlined />,
  [Side.Right]: <BorderRightOutlined />,
  [Side.Top]: <BorderTopOutlined />,
}

const sides = [Side.Top, Side.Bottom, Side.Left, Side.Right, Side.Center]

interface BorderSidePickerProps {
  side: Side
  canResetSide?(side: Side): boolean
  onChange(side: Side): void
}

export const BorderSidePicker = ({
  canResetSide,
  onChange,
  side,
}: BorderSidePickerProps) => {
  return (
    <Radio.Group
      onChange={(val) => {
        onChange(val.target.value)
      }}
      size="small"
      value={side}
    >
      <div
        className={clsx(
          classes.borderContainer,
          'grid w-full justify-center p-0',
        )}
      >
        {sides.map((borderSide) => {
          return (
            <Radio.Button
              className={`flex items-center justify-center ${
                canResetSide?.(borderSide) ? 'bg-sky-100 hover:bg-sky-200' : ''
              }`}
              key={borderSide}
              style={{ borderRadius: 0, gridArea: borderSide }}
              value={borderSide}
            >
              {sideToIcon[borderSide]}
            </Radio.Button>
          )
        })}
      </div>
    </Radio.Group>
  )
}
