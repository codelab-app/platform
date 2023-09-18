import {
  MinusCircleOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusSettingOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons'
import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { SegmentedSelect, ValuePicker } from '../components'
import { ResetIcon } from '../components/ResetIcon'
import { CssProperty } from '../css'
import { useStyle } from '../style.hook'

const sideOptions = [
  {
    // TODO: revisit icons
    icon: <MinusCircleOutlined />,
    value: 'all',
  },
  {
    icon: <RadiusSettingOutlined />,
    value: 'side',
  },
]

export const BorderRadiusEditor = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()
  const [selectedSide, setSelectedSide] = useState('all')

  return (
    <div className="space-y-2">
      <Row
        align="middle"
        className="w-full"
        justify="space-between"
        wrap={false}
      >
        <Col span={10}>
          <SegmentedSelect
            canReset={canReset(CssProperty.BorderRadius)}
            label="Radius"
            onChange={setSelectedSide}
            onReset={() => resetStyle(CssProperty.BorderRadius)}
            options={sideOptions}
            size="small"
            value={selectedSide}
          />
        </Col>
        <Col span={12}>
          <ValuePicker
            currentValue={getCurrentStyle(CssProperty.BorderRadius)}
            onChange={(value) => setStyle(CssProperty.BorderRadius, value)}
          />
          {/* </Row> */}
        </Col>
      </Row>
      {selectedSide === 'side' && (
        <Col className="space-y-2">
          <Row align="middle" className="space-x-2" justify="end" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.BorderTopLeftRadius)}
              onChange={(value) =>
                setStyle(CssProperty.BorderTopLeftRadius, value)
              }
              prefix={ResetIcon({
                canReset: canReset(CssProperty.BorderTopLeftRadius),
                icon: <RadiusUpleftOutlined />,
                onReset: () => resetStyle(CssProperty.BorderTopLeftRadius),
              })}
            />
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.BorderTopRightRadius)}
              onChange={(value) =>
                setStyle(CssProperty.BorderTopRightRadius, value)
              }
              prefix={ResetIcon({
                canReset: canReset(CssProperty.BorderTopRightRadius),
                icon: <RadiusUprightOutlined />,
                onReset: () => resetStyle(CssProperty.BorderTopRightRadius),
              })}
            />
          </Row>
          <Row align="middle" className="space-x-2" justify="end" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.BorderBottomLeftRadius)}
              onChange={(value) =>
                setStyle(CssProperty.BorderBottomLeftRadius, value)
              }
              prefix={ResetIcon({
                canReset: canReset(CssProperty.BorderBottomLeftRadius),
                icon: <RadiusBottomleftOutlined />,
                onReset: () => resetStyle(CssProperty.BorderBottomLeftRadius),
              })}
            />
            <ValuePicker
              currentValue={getCurrentStyle(
                CssProperty.BorderBottomRightRadius,
              )}
              onChange={(value) =>
                setStyle(CssProperty.BorderBottomRightRadius, value)
              }
              prefix={ResetIcon({
                canReset: canReset(CssProperty.BorderBottomRightRadius),
                icon: <RadiusBottomrightOutlined />,
                onReset: () => resetStyle(CssProperty.BorderBottomRightRadius),
              })}
            />
          </Row>
        </Col>
      )}
    </div>
  )
}
