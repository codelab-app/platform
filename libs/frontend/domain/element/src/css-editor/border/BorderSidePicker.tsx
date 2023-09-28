import {
  BorderBottomOutlined,
  BorderLeftOutlined,
  BorderOuterOutlined,
  BorderRightOutlined,
  BorderTopOutlined,
} from '@ant-design/icons'
import { Radio } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { Side } from '../utils'
import classes from './borderStyle.module.css'

const sideToIcon = {
  [Side.Bottom]: <BorderBottomOutlined />,
  [Side.Left]: <BorderLeftOutlined />,
  [Side.Right]: <BorderRightOutlined />,
  [Side.Top]: <BorderTopOutlined />,
  [Side.Center]: <BorderOuterOutlined />,
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
      onChange={(val) => onChange(val.target.value)}
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
              children={sideToIcon[borderSide]}
              className={`flex items-center justify-center ${
                canResetSide?.(borderSide) ? 'bg-sky-100 hover:bg-sky-200' : ''
              }`}
              key={borderSide}
              style={{ borderRadius: 0, gridArea: borderSide }}
              value={borderSide}
            ></Radio.Button>
          )
        })}
      </div>
    </Radio.Group>
  )
}
