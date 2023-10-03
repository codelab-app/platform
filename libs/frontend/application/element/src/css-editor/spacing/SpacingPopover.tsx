import UndoOutlined from '@ant-design/icons/UndoOutlined'
import { Button, Col, Row } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { ValuePicker } from '../components'
import { ValueSlider } from '../components/ValueSlider'
import { CssUnit, parseCssValue } from '../utils'

const commonValues = ['auto', '0', '10', '20', '40', '60', '100', '140', '220']

interface SpacingPopoverProps {
  canReset?: boolean
  value?: string
  onChange?(value: string): void
  onReset?(): void
}

export const SpacingPopover = ({
  canReset,
  onChange,
  onReset,
  value,
}: SpacingPopoverProps) => {
  const { unit, value: currentValue } = parseCssValue(value ?? '0px')

  return (
    <div className="space-y-2">
      <Row align="middle" justify="space-between" wrap={false}>
        <Col span={12}>
          <ValueSlider onChange={onChange} unit={unit} value={currentValue} />
        </Col>
        <ValuePicker currentValue={value} onChange={onChange} />
      </Row>
      <div className="grid w-full grid-cols-5 gap-1">
        {commonValues.map((val, idx) => (
          <div
            className={clsx(
              'flex cursor-pointer items-center justify-center bg-gray-100 p-2',
              {
                'bg-sky-100': String(currentValue) === val || unit === val,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'row-span-2': idx === 0,
              },
            )}
            key={idx}
            onClick={() =>
              onChange?.(val === 'auto' ? val : `${val}${CssUnit.PX}`)
            }
          >
            {val}
          </div>
        ))}
      </div>

      {canReset && (
        <>
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
        </>
      )}
    </div>
  )
}
