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
import { useStyle } from '../style.hook'
import { BorderProperty, DefaultBorderProperties } from './properties'

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
          <Row justify="space-between" wrap={false}>
            <Col>Radius</Col>
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
            currentValue={getCurrentStyle(
              DefaultBorderProperties[BorderProperty.Radius],
            )}
            onChange={(value) => setStyle(BorderProperty.Radius, value)}
          />
          {/* </Row> */}
        </Col>
      </Row>
      {selectedSide === 'side' && (
        <Col className="space-y-2">
          <Row align="middle" className="space-x-2" justify="end" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(
                DefaultBorderProperties[BorderProperty.TopLeftRadius],
              )}
              onChange={(value) =>
                setStyle(BorderProperty.TopLeftRadius, value)
              }
              prefix={<RadiusUpleftOutlined />}
            />
            <ValuePicker
              currentValue={getCurrentStyle(
                DefaultBorderProperties[BorderProperty.TopRightRadius],
              )}
              onChange={(value) =>
                setStyle(BorderProperty.TopRightRadius, value)
              }
              prefix={<RadiusUprightOutlined />}
            />
          </Row>
          <Row align="middle" className="space-x-2" justify="end" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(
                DefaultBorderProperties[BorderProperty.BottomLeftRadius],
              )}
              onChange={(value) =>
                setStyle(BorderProperty.BottomLeftRadius, value)
              }
              prefix={<RadiusBottomleftOutlined />}
            />
            <ValuePicker
              currentValue={getCurrentStyle(
                DefaultBorderProperties[BorderProperty.BottomRightRadius],
              )}
              onChange={(value) =>
                setStyle(BorderProperty.BottomRightRadius, value)
              }
              prefix={<RadiusBottomrightOutlined />}
            />
          </Row>
        </Col>
      )}
    </div>
  )
}
