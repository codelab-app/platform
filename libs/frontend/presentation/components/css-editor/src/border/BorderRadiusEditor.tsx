import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined'
import RadiusBottomleftOutlined from '@ant-design/icons/RadiusBottomleftOutlined'
import RadiusBottomrightOutlined from '@ant-design/icons/RadiusBottomrightOutlined'
import RadiusSettingOutlined from '@ant-design/icons/RadiusSettingOutlined'
import RadiusUpleftOutlined from '@ant-design/icons/RadiusUpleftOutlined'
import RadiusUprightOutlined from '@ant-design/icons/RadiusUprightOutlined'
import { Col, Row } from 'antd'
import { useState } from 'react'
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
  const { canReset, getCurrentStyle, removeStyles, resetStyle, setStyle } =
    useStyle()

  const areAllSidesNotTheSame = (): boolean => {
    return [
      getCurrentStyle(CssProperty.BorderTopLeftRadius),
      getCurrentStyle(CssProperty.BorderTopRightRadius),
      getCurrentStyle(CssProperty.BorderBottomLeftRadius),
      getCurrentStyle(CssProperty.BorderBottomRightRadius),
    ].some((val) => val !== getCurrentStyle(CssProperty.BorderRadius))
  }

  const [selectedSide, setSelectedSide] = useState(
    areAllSidesNotTheSame() ? 'side' : 'all',
  )

  const resetAll = () => {
    resetStyle(CssProperty.BorderTopLeftRadius)
    resetStyle(CssProperty.BorderTopRightRadius)
    resetStyle(CssProperty.BorderBottomLeftRadius)
    resetStyle(CssProperty.BorderBottomRightRadius)
    resetStyle(CssProperty.BorderRadius)
  }

  const setAllSidesRadius = (value: string) => {
    setStyle(CssProperty.BorderTopLeftRadius, value)
    setStyle(CssProperty.BorderTopRightRadius, value)
    setStyle(CssProperty.BorderBottomLeftRadius, value)
    setStyle(CssProperty.BorderBottomRightRadius, value)
    setStyle(CssProperty.BorderRadius, value)
  }

  const setSideRadius = (side: CssProperty, value: string) => {
    const allSidesRadius = getCurrentStyle(CssProperty.BorderRadius)

    if (value !== allSidesRadius) {
      removeStyles([CssProperty.BorderRadius])
    }

    setStyle(side, value)
  }

  return (
    <div className="space-y-2">
      <Row align="middle" justify="space-between" wrap={false}>
        <Col span={12}>
          <SegmentedSelect
            canReset={
              canReset(CssProperty.BorderRadius) || areAllSidesNotTheSame()
            }
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
            onChange={setAllSidesRadius}
          />
          {/* </Row> */}
        </Col>
      </Row>
      {selectedSide === 'side' && (
        <Col className="space-y-2">
          <Row align="middle" className="space-x-2" justify="end" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.BorderTopLeftRadius)}
              onChange={(value) => {
                setSideRadius(CssProperty.BorderTopLeftRadius, value)
              }}
              prefix={ResetIcon({
                canReset: canReset(CssProperty.BorderTopLeftRadius),
                icon: <RadiusUpleftOutlined />,
                onReset: () => {
                  resetStyle(CssProperty.BorderTopLeftRadius)
                },
              })}
            />
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.BorderTopRightRadius)}
              onChange={(value) => {
                setSideRadius(CssProperty.BorderTopRightRadius, value)
              }}
              prefix={ResetIcon({
                canReset: canReset(CssProperty.BorderTopRightRadius),
                icon: <RadiusUprightOutlined />,
                onReset: () => {
                  resetStyle(CssProperty.BorderTopRightRadius)
                },
              })}
            />
          </Row>
          <Row align="middle" className="space-x-2" justify="end" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.BorderBottomLeftRadius)}
              onChange={(value) => {
                setSideRadius(CssProperty.BorderBottomLeftRadius, value)
              }}
              prefix={ResetIcon({
                canReset: canReset(CssProperty.BorderBottomLeftRadius),
                icon: <RadiusBottomleftOutlined />,
                onReset: () => {
                  resetStyle(CssProperty.BorderBottomLeftRadius)
                },
              })}
            />
            <ValuePicker
              currentValue={getCurrentStyle(
                CssProperty.BorderBottomRightRadius,
              )}
              onChange={(value) => {
                setSideRadius(CssProperty.BorderBottomRightRadius, value)
              }}
              prefix={ResetIcon({
                canReset: canReset(CssProperty.BorderBottomRightRadius),
                icon: <RadiusBottomrightOutlined />,
                onReset: () => {
                  resetStyle(CssProperty.BorderBottomRightRadius)
                },
              })}
            />
          </Row>
        </Col>
      )}
    </div>
  )
}
