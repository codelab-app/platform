import { Col, Row, Slider } from 'antd'
import clsx from 'clsx'
import { ValuePicker } from '../components'
import { combineCssValue, parseCssValue } from '../utils'

const commonValues = ['auto', '0', '10', '20', '40', '60', '100', '140', '220']

interface SpacingPopoverProps {
  value?: string
  onChange?(value: string): void
}

export const SpacingPopover = ({ onChange, value }: SpacingPopoverProps) => {
  const { unit, value: currentValue } = parseCssValue(value ?? '0px')

  return (
    <div className="space-y-2">
      <Row align="middle" justify="space-between" wrap={false}>
        <Col span={12}>
          <Slider
            max={300}
            min={0}
            onChange={(val) =>
              onChange?.(combineCssValue({ unit, value: val }))
            }
            value={currentValue}
          />
        </Col>
        <ValuePicker currentValue={value} onChange={onChange} />
      </Row>
      <div className="grid w-full grid-cols-5 gap-1">
        {commonValues.map((val, idx) => (
          <div
            className={clsx(
              'flex cursor-pointer items-center justify-center bg-gray-100 p-2',
              {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'row-span-2': idx === 0,
              },
            )}
            key={idx}
            onClick={() =>
              onChange?.(combineCssValue({ unit, value: Number(val) }))
            }
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  )
}
