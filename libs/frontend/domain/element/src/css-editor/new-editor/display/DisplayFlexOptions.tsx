import {
  ColumnHeightOutlined,
  PicCenterOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import { useState } from 'react'
import { SegmentedSelect } from '../components/SegmentedSelect'
import { ValuePicker } from '../components/ValuePicker'

const justifyOptions = [
  {
    icon: <VerticalAlignBottomOutlined rotate={90} />,
    value: 'flex-start',
  },
  {
    icon: <VerticalAlignMiddleOutlined rotate={90} />,
    value: 'center',
  },
  {
    icon: <VerticalAlignTopOutlined rotate={90} />,
    value: 'flex-end',
  },
  {
    icon: <ColumnHeightOutlined rotate={90} />,
    value: 'space-between',
  },
  {
    icon: <PicCenterOutlined rotate={90} />,
    value: 'space-around',
  },
]

const alignOptions = [
  {
    icon: <VerticalAlignBottomOutlined />,
    value: 'flex-start',
  },
  {
    icon: <VerticalAlignMiddleOutlined />,
    value: 'center',
  },
  {
    icon: <VerticalAlignTopOutlined />,
    value: 'flex-end',
  },
  {
    icon: <ColumnHeightOutlined />,
    value: 'stretch',
  },
  {
    icon: <PicCenterOutlined />,
    value: 'baseline',
  },
]

const directionOptions = [
  {
    label: 'Horizontal',
    value: 'row',
  },
  {
    label: 'Vertical',
    value: 'column',
  },
]

const wrapOptions = [
  {
    label: "Don't Wrap",
    value: 'nowrap',
  },
  {
    label: 'Wrap',
    value: 'wrap',
  },
]

export const DisplayFlexOptions = () => {
  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('flex-start')
  const [align, setAlign] = useState('flex-start')
  const [wrap, setWrap] = useState('nowrap')

  return (
    <Col className="space-y-2">
      <Divider className="my-2" />
      <SegmentedSelect
        label="Direction"
        onChange={setDirection}
        options={directionOptions}
        value={direction}
      />
      <SegmentedSelect
        label="Justify"
        onChange={setJustify}
        options={justifyOptions}
        value={justify}
      />
      <SegmentedSelect
        label="Align"
        onChange={setAlign}
        options={alignOptions}
        value={align}
      />
      <Row align="middle" justify="space-between" wrap={false}>
        <Col className="text-[12px]">Gap</Col>
        <Col>
          <Row className="space-x-1" wrap={false}>
            <ValuePicker />
            <ValuePicker />
          </Row>
        </Col>
      </Row>
      <Divider className="my-2" />
      <SegmentedSelect
        label="Children"
        onChange={setWrap}
        options={wrapOptions}
        value={wrap}
      />
    </Col>
  )
}
