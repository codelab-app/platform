import { Col, Row, Slider } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { ValuePicker } from '../components'

const commonValues = ['auto', '0', '10', '20', '40', '60', '100', '140', '220']

export const SpacingPopover = () => {
  const [inputValue, setInputValue] = useState(0)

  return (
    <div>
      <Row align="middle" justify="space-between" wrap={false}>
        <Col span={12}>
          <Slider
            max={300}
            min={0}
            onChange={setInputValue}
            value={inputValue}
          />
        </Col>
        <ValuePicker onChange={setInputValue} value={inputValue} />
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
            onClick={() => {
              setInputValue(Number(val))
            }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  )
}
