import { Popover, Row } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { LabeledSelect } from '../components'
import { SpacingPopover } from '../spacing/SpacingPopover'
import { useStyle } from '../style.hook'
import { CssUnit, getCursorForSide, parseCssValue, Side } from '../utils'
import classes from './positionStyle.module.css'

const positionOptions = [
  { label: 'Static', value: 'static' },
  { label: 'Relative', value: 'relative' },
  { label: 'Absolute', value: 'absolute' },
  { label: 'Fixed', value: 'fixed' },
]

const sides = [Side.Top, Side.Right, Side.Bottom, Side.Left]

export const PositionEditor = () => {
  const { getCurrentStyle, setStyle } = useStyle()

  const PopoverContent = (side: Side) => {
    const value = getCurrentStyle({
      defaultValue: '0px',
      key: side,
    })

    const { unit, value: cssValue } = parseCssValue(value)

    return (
      <Popover
        content={
          <SpacingPopover
            onChange={(val) => setStyle(side, val)}
            value={value}
          />
        }
        trigger="click"
      >
        <div className="text-[12px] text-gray-500">{`${cssValue}${
          unit !== CssUnit.PX ? unit : ''
        }`}</div>
      </Popover>
    )
  }

  const [position, setPosition] = useState(
    getCurrentStyle({
      defaultValue: 'static',
      key: 'position',
    }),
  )

  return (
    <div className="space-y-2">
      <LabeledSelect
        label="Position"
        onChange={(val) => {
          setPosition(val)
          setStyle('position', val)
        }}
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
                  key={side}
                  style={{ cursor: getCursorForSide(side), gridArea: side }}
                >
                  {PopoverContent(side)}
                </div>
              )
            })}
          </div>
        </Row>
      )}
    </div>
  )
}
