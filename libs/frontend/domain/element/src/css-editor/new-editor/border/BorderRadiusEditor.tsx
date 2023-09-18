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
  const { getCurrentStyle, setStyle } = useStyle()
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
          <Row align="middle" justify="space-between" wrap={false}>
            <Col className="text-[12px]">Radius</Col>
            <SegmentedSelect
              onChange={setSelectedSide}
              options={sideOptions}
              size="small"
              value={selectedSide}
            />
          </Row>
        </Col>
        <Col span={12}>
          {/* <Row align="middle" justify="space-between" wrap={false}> */}
          {/*  <Col span={12}> */}
          {/* <Slider */}
          {/*  max={300} */}
          {/*  min={0} */}
          {/*  onChange={(value) => */}
          {/*    setStyle(BorderProperty.Radius, `${value}px`) */}
          {/*  } */}
          {/*  value={ */}
          {/*    parseCssValue( */}
          {/*      getCurrentStyle( */}
          {/*        DefaultBorderProperties[BorderProperty.Radius], */}
          {/*      ), */}
          {/*    ).value */}
          {/*  } */}
          {/*/ > */}
          {/* </Col> */}
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
              prefix={<RadiusUpleftOutlined />}
            />
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.BorderTopRightRadius)}
              onChange={(value) =>
                setStyle(CssProperty.BorderTopRightRadius, value)
              }
              prefix={<RadiusUprightOutlined />}
            />
          </Row>
          <Row align="middle" className="space-x-2" justify="end" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.BorderBottomLeftRadius)}
              onChange={(value) =>
                setStyle(CssProperty.BorderBottomLeftRadius, value)
              }
              prefix={<RadiusBottomleftOutlined />}
            />
            <ValuePicker
              currentValue={getCurrentStyle(
                CssProperty.BorderBottomRightRadius,
              )}
              onChange={(value) =>
                setStyle(CssProperty.BorderBottomRightRadius, value)
              }
              prefix={<RadiusBottomrightOutlined />}
            />
          </Row>
        </Col>
      )}
    </div>
  )
}
