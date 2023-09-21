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

// TODO: revisit not working properly
export const BorderRadiusEditor = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()

  const expanded = (): boolean => {
    const res = [
      getCurrentStyle(CssProperty.BorderTopLeftRadius),
      getCurrentStyle(CssProperty.BorderTopRightRadius),
      getCurrentStyle(CssProperty.BorderBottomLeftRadius),
      getCurrentStyle(CssProperty.BorderBottomRightRadius),
    ].some((val) => val !== getCurrentStyle(CssProperty.BorderRadius))

    return res
  }

  const [selectedSide, setSelectedSide] = useState(expanded() ? 'side' : 'all')

  const resetAll = () => {
    console.log('reset all')
    resetStyle(CssProperty.BorderTopLeftRadius)
    resetStyle(CssProperty.BorderTopRightRadius)
    resetStyle(CssProperty.BorderBottomLeftRadius)
    resetStyle(CssProperty.BorderBottomRightRadius)
    resetStyle(CssProperty.BorderRadius)
  }

  const setAll = (value: string) => {
    if (expanded()) {
      setStyle(CssProperty.BorderTopLeftRadius, value)
      setStyle(CssProperty.BorderTopRightRadius, value)
      setStyle(CssProperty.BorderBottomLeftRadius, value)
      setStyle(CssProperty.BorderBottomRightRadius, value)
    }

    setStyle(CssProperty.BorderRadius, value)
  }

  return (
    <div className="space-y-2">
      <Row align="middle" justify="space-between" wrap={false}>
        <Col span={12}>
          <SegmentedSelect
            canReset={canReset(CssProperty.BorderRadius) || expanded()}
            label="Radius"
            onChange={setSelectedSide}
            onReset={resetAll}
            options={sideOptions}
            size="small"
            value={selectedSide}
            wideLabel
          />
        </Col>
        <Col span={11}>
          <ValuePicker
            currentValue={getCurrentStyle(CssProperty.BorderRadius)}
            onChange={setAll}
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
