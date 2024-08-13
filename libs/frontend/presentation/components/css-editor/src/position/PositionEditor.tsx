import { Popover, Row } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { LabeledSelect } from '../components'
import { CssProperty } from '../css'
import { SpacingPopover } from '../spacing/SpacingPopover'
import { useStyle } from '../style.hook'
import { CssUnit, getCursorForSide, parseCssValue } from '../utils'
import classes from './positionStyle.module.css'

const positionOptions = [
  { label: 'Static', value: 'static' },
  { label: 'Relative', value: 'relative' },
  { label: 'Absolute', value: 'absolute' },
  { label: 'Fixed', value: 'fixed' },
]

const sides = [
  CssProperty.Top,
  CssProperty.Right,
  CssProperty.Bottom,
  CssProperty.Left,
]

export const PositionEditor = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()

  const PopoverContent = (side: CssProperty) => {
    const value = getCurrentStyle(side)
    const { unit, value: cssValue } = parseCssValue(value)

    const getCurrentText = () => {
      if (unit === CssUnit.Auto) {
        return 'auto'
      }

      if (unit === CssUnit.PX) {
        return cssValue
      }

      return `${cssValue}${unit}`
    }

    return (
      <Popover
        content={
          <SpacingPopover
            canReset={canReset(side)}
            onChange={(val) => {
              setStyle(side, val)
            }}
            onReset={() => {
              resetStyle(side)
            }}
            value={value}
          />
        }
        trigger="click"
      >
        <div className="text-[12px] text-gray-500">{getCurrentText()}</div>
      </Popover>
    )
  }

  return (
    <div className="space-y-2">
      <LabeledSelect
        canReset={canReset(CssProperty.Position)}
        label="Position"
        onChange={(val) => {
          setStyle(CssProperty.Position, val)
        }}
        onReset={() => {
          resetStyle(CssProperty.Position)
        }}
        options={positionOptions}
        value={getCurrentStyle(CssProperty.Position)}
      />
      {getCurrentStyle(CssProperty.Position) !== 'static' && (
        <Row justify="end">
          <div
            className={clsx(
              classes.positionContainer,
              'grid w-1/2 bg-gray-200 p-1',
            )}
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
