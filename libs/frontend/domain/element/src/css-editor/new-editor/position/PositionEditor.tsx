import { Popover, Row } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { LabeledSelect } from '../components'
import { SpacingPopover } from '../spacing/SpacingPopover'
import { getCursorForSide, Side } from '../utils'
import classes from './positionStyle.module.css'

const positionOptions = [
  { label: 'Static', value: 'static' },
  { label: 'Relative', value: 'relative' },
  { label: 'Absolute', value: 'absolute' },
  { label: 'Fixed', value: 'fixed' },
]

const sides = [Side.Top, Side.Right, Side.Bottom, Side.Left]

export const PositionEditor = () => {
  const [position, setPosition] = useState('static')

  return (
    <div className="space-y-2">
      <LabeledSelect
        label="Position"
        onChange={setPosition}
        options={positionOptions}
        value={position}
      />
      {position !== 'static' && (
        <Row justify="end">
          <div
            className={clsx(classes.positionContainer, 'grid bg-gray-200 p-1')}
          >
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
                  style={{ cursor: getCursorForSide(side), gridArea: side }}
                >
                  <Popover content={<SpacingPopover />} trigger="click">
                    <div className="text-gray-500">{0}</div>
                  </Popover>
                </div>
              )
            })}
          </div>
        </Row>
      )}
    </div>
  )
}
