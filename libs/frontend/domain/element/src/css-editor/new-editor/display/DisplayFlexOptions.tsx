import {
  ColumnHeightOutlined,
  PicCenterOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import { SegmentedSelect, ValuePicker } from '../components'
import { CssProperty } from '../css'
import { useStyle } from '../style.hook'

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
  const { getCurrentStyle, setStyle } = useStyle()

  return (
    <Col className="space-y-2">
      <Divider className="my-2" />
      <SegmentedSelect
        label="Direction"
        onChange={(value) => setStyle(CssProperty.FlexDirection, value)}
        options={directionOptions}
        value={getCurrentStyle(CssProperty.FlexDirection)}
      />
      <SegmentedSelect
        label="Justify"
        onChange={(value) => setStyle(CssProperty.JustifyContent, value)}
        options={justifyOptions}
        value={getCurrentStyle(CssProperty.JustifyContent)}
      />
      <SegmentedSelect
        label="Align"
        onChange={(value) => setStyle(CssProperty.AlignItems, value)}
        options={alignOptions}
        value={getCurrentStyle(CssProperty.AlignItems)}
      />
      <Row align="middle" justify="space-between" wrap={false}>
        <Col className="text-[12px]" span={6}>
          Gap
        </Col>
        <Col>
          <Row className="space-x-1" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.ColumnGap)}
              label="Row"
              onChange={(value) => setStyle(CssProperty.ColumnGap, value)}
            />
            <ValuePicker
              currentValue={getCurrentStyle(CssProperty.RowGap)}
              label="Col"
              onChange={(value) => setStyle(CssProperty.RowGap, value)}
            />
          </Row>
        </Col>
      </Row>
      <Divider className="my-2" />
      <SegmentedSelect
        label="Children"
        onChange={(value) => setStyle(CssProperty.FlexWrap, value)}
        options={wrapOptions}
        value={getCurrentStyle(CssProperty.FlexWrap)}
      />
    </Col>
  )
}
