import { Popover } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { CssProperty } from '../css'
import { useStyle } from '../style.hook'
import {
  CssUnit,
  getCursorForSide,
  getCursorForSideReversed,
  parseCssValue,
} from '../utils'
import { SpacingPopover } from './SpacingPopover'
import classes from './spacingStyle.module.css'

const sides = [
  CssProperty.Top,
  CssProperty.Right,
  CssProperty.Bottom,
  CssProperty.Left,
]

export const SpacingEditor = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()

  const PopoverContent = (side: CssProperty, key = 'padding') => {
    const cssPropName = `${key}-${side}` as CssProperty
    const currentCssValue = getCurrentStyle(cssPropName)
    const { unit, value } = parseCssValue(currentCssValue)

    const valueToShow = () => {
      if (value === 0) {
        return '0'
      }

      if (unit === 'auto') {
        return 'auto'
      }

      return `${value}${unit !== CssUnit.PX ? unit : ''}`
    }

    return (
      <Popover
        content={
          <SpacingPopover
            canReset={canReset(cssPropName)}
            onChange={(val) => setStyle(cssPropName, val)}
            onReset={() => resetStyle(cssPropName)}
            value={currentCssValue}
          />
        }
        trigger="click"
      >
        <div
          className={`cursor-default whitespace-nowrap rounded-[2px] p-[2px] text-[11px] text-gray-500 ${
            canReset(cssPropName) ? 'bg-sky-100 hover:bg-sky-200' : ''
          }`}
        >
          {valueToShow()}
        </div>
      </Popover>
    )
  }

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
              className="flex h-full w-full items-center justify-center self-center"
              key={side}
              style={{ cursor: getCursorForSide(side), gridArea: side }}
            >
              {PopoverContent(side, 'margin')}
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
              key={side}
              // Since padding is inwards, we need to reverse the cursor
              style={{ cursor: getCursorForSideReversed(side), gridArea: side }}
            >
              {PopoverContent(side, 'padding')}
            </div>
          )
        })}
      </div>
    </div>
  )
}
