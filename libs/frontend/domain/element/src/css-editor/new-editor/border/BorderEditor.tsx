import {
  CloseOutlined,
  DashOutlined,
  MinusOutlined,
  SmallDashOutlined,
} from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import React, { useState } from 'react'
import { SegmentedSelect, ValuePicker } from '../components'
import { ColorPicker } from '../components/ColorPicker'
import type { CssProperty } from '../css'
import { useStyle } from '../style.hook'
import { Side } from '../utils'
import { BorderRadiusEditor } from './BorderRadiusEditor'
import { BorderSidePicker } from './BorderSidePicker'

const styleOptions = [
  {
    icon: <CloseOutlined />,
    value: 'none',
  },
  {
    icon: <MinusOutlined />,
    value: 'solid',
  },
  {
    icon: <DashOutlined />,
    value: 'dashed',
  },
  {
    icon: <SmallDashOutlined />,
    value: 'dotted',
  },
]

const getSidePropertyName = (side: Side, property: string) => {
  let key = ''

  if (side === Side.Center) {
    key = `border-${property}`
  } else {
    key = `border-${side}-${property}`
  }

  return key as CssProperty
}

export const BorderEditor = () => {
  const { getCurrentStyle, setStyle } = useStyle()
  const [selectedSide, setSelectedSide] = useState(Side.Center)

  return (
    <Col>
      <Row justify="space-between" wrap={false}>
        <Col span={8}>
          <BorderSidePicker onChange={setSelectedSide} side={selectedSide} />
        </Col>
        <Col className="w-full space-y-2" span={14}>
          <SegmentedSelect
            label="Style"
            onChange={(value) =>
              setStyle(getSidePropertyName(selectedSide, 'style'), value)
            }
            options={styleOptions}
            size="small"
            value={getCurrentStyle(getSidePropertyName(selectedSide, 'style'))}
          />
          <ValuePicker
            currentValue={getCurrentStyle(
              getSidePropertyName(selectedSide, 'width'),
            )}
            label="Width"
            onChange={(value) =>
              setStyle(getSidePropertyName(selectedSide, 'width'), value)
            }
            size="small"
          />
          <ColorPicker
            label="Color"
            onChange={(value) =>
              setStyle(getSidePropertyName(selectedSide, 'color'), value)
            }
            size="small"
            value={getCurrentStyle(getSidePropertyName(selectedSide, 'color'))}
          />
        </Col>
      </Row>
      <Divider className="my-2 mt-3" />
      <BorderRadiusEditor />
    </Col>
  )
}
