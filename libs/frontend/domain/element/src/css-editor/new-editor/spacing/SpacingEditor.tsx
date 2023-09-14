import { Popover } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { useStyle } from '../style.hook'
import {
  CssUnit,
  getCursorForSide,
  getCursorForSideReversed,
  parseCssValue,
  Side,
} from '../utils'
import { SpacingPopover } from './SpacingPopover'
import classes from './spacingStyle.module.css'

const sides = [Side.Top, Side.Right, Side.Bottom, Side.Left]

export const SpacingEditor = () => {
  const { getCurrentStyle, setStyle } = useStyle()

  const PopoverContent = (side: Side, key = 'padding') => {
    const value = getCurrentStyle({
      defaultValue: '0px',
      key: `${key}-${side}`,
    })

    const { unit, value: cssValue } = parseCssValue(value)

    return (
      <Popover
        content={
          <SpacingPopover
            onChange={(val) => setStyle(`${key}-${side}`, val)}
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
              key={side}
              style={{ cursor: getCursorForSide(side), gridArea: side }}
            >
              {/* <Popover */}
              {/*  content={ */}
              {/*    <SpacingPopover */}
              {/*      onChange={(val) => setStyle(`margin-${side}`, val)} */}
              {/*      value={getCurrentStyle({ */}
              {/*        defaultValue: '0px', */}
              {/*        key: `margin-${side}`, */}
              {/*      })} */}
              {/*    /> */}
              {/*  } */}
              {/*  trigger="click" */}
              {/* > */}
              {/*  <div className="text-gray-500">{0}</div> */}
              {/* </Popover> */}

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
              {/* <Popover */}
              {/*  content={ */}
              {/*    <SpacingPopover */}
              {/*      onChange={(val) => setStyle(`padding-${side}`, val)} */}
              {/*      value={getCurrentStyle({ */}
              {/*        defaultValue: '0px', */}
              {/*        key: `padding-${side}`, */}
              {/*      })} */}
              {/*    /> */}
              {/*  } */}
              {/*  trigger="click" */}
              {/* > */}
              {/*  <div className="text-gray-500">{0}</div> */}
              {/* </Popover> */}
              {PopoverContent(side, 'padding')}
            </div>
          )
        })}
      </div>
    </div>
  )
}
