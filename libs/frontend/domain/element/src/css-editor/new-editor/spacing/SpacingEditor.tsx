import { Popover } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { Side } from '../utils'
import { SpacingPopover } from './SpacingPopover'
import classes from './spacingStyle.module.css'

const sides = [Side.Top, Side.Right, Side.Bottom, Side.Left]

// Since padding is inwards, we need to reverse the cursor
const getPaddingSideCursor = (side: Side) => {
  switch (side) {
    case Side.Top:
      return 's-resize'
    case Side.Right:
      return 'w-resize'
    case Side.Bottom:
      return 'n-resize'
  }

  return 'e-resize'
}

export const SpacingEditor = () => {
  return (
    <div className={clsx(classes.container, 'relative grid w-full')}>
      <div
        className={clsx(
          classes.marginContainer,
          'grid w-full justify-center bg-gray-100 p-1',
        )}
      >
        <div className="absolute left-1 top-1 text-[10px] font-semibold text-gray-500">
          MARGIN
        </div>
        {sides.map((side) => {
          return (
            <div
              className="flex items-center justify-center self-center"
              style={{ cursor: `${side}-resize`, gridArea: side }}
            >
              <Popover content={<SpacingPopover />} trigger="click">
                <div className="text-gray-500">{0}</div>
              </Popover>
            </div>
          )
        })}
      </div>
      <div
        className={clsx(
          classes.paddingContainer,
          'grid w-full justify-center self-center justify-self-center bg-gray-200 p-1',
        )}
      >
        <div className="text-[10px] font-semibold text-gray-500">PADDING</div>
        <div
          className="flex items-center justify-center"
          style={{ gridArea: 'center' }}
        >
          <div className="h-[10px] w-full self-center bg-white"></div>
        </div>
        {sides.map((side) => {
          return (
            <div
              className="flex items-center justify-center self-center"
              style={{ cursor: getPaddingSideCursor(side), gridArea: side }}
            >
              <Popover content={<SpacingPopover />} trigger="click">
                <div className="text-gray-500">{0}</div>
              </Popover>
            </div>
          )
        })}
      </div>
    </div>
  )
}
