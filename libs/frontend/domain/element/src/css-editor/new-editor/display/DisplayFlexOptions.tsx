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
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()

  return (
    <Col className="space-y-2">
      <Divider className="my-2" />
      <SegmentedSelect
        canReset={canReset(CssProperty.FlexDirection)}
        label="Direction"
        onChange={(value) => setStyle(CssProperty.FlexDirection, value)}
        onReset={() => resetStyle(CssProperty.FlexDirection)}
        options={directionOptions}
        value={getCurrentStyle(CssProperty.FlexDirection)}
      />
      <SegmentedSelect
        canReset={canReset(CssProperty.JustifyContent)}
        label="Justify"
        onChange={(value) => setStyle(CssProperty.JustifyContent, value)}
        onReset={() => resetStyle(CssProperty.JustifyContent)}
        options={justifyOptions}
        value={getCurrentStyle(CssProperty.JustifyContent)}
      />
      <SegmentedSelect
        canReset={canReset(CssProperty.AlignItems)}
        label="Align"
        onChange={(value) => setStyle(CssProperty.AlignItems, value)}
        onReset={() => resetStyle(CssProperty.AlignItems)}
        options={alignOptions}
        value={getCurrentStyle(CssProperty.AlignItems)}
      />
      <Row align="middle" justify="space-between" wrap={false}>
        <Col className="text-[11px]" span={6}>
          Gap
        </Col>
        <Col>
          <Row className="space-x-1" wrap={false}>
            <ValuePicker
              canReset={canReset(CssProperty.RowGap)}
              currentValue={getCurrentStyle(CssProperty.RowGap)}
              label="Row"
              onChange={(value) => setStyle(CssProperty.RowGap, value)}
              onReset={() => resetStyle(CssProperty.RowGap)}
            />
            <ValuePicker
              canReset={canReset(CssProperty.ColumnGap)}
              currentValue={getCurrentStyle(CssProperty.ColumnGap)}
              label="Col"
              onChange={(value) => setStyle(CssProperty.ColumnGap, value)}
              onReset={() => resetStyle(CssProperty.ColumnGap)}
            />
          </Row>
        </Col>
      </Row>
      <Divider className="my-2" />
      <SegmentedSelect
        canReset={canReset(CssProperty.FlexWrap)}
        label="Children"
        onChange={(value) => setStyle(CssProperty.FlexWrap, value)}
        onReset={() => resetStyle(CssProperty.FlexWrap)}
        options={wrapOptions}
        value={getCurrentStyle(CssProperty.FlexWrap)}
      />
    </Col>
  )
}
