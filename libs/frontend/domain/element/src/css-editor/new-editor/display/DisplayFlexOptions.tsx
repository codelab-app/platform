import {
  ColumnHeightOutlined,
  PicCenterOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import { SegmentedSelect } from '../components/SegmentedSelect'
import { ValuePicker } from '../components/ValuePicker'
import { useStyle } from '../style.hook'
import { DefaultDisplayProperties, DisplayProperties } from './properties'

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
        onChange={(value) => setStyle(DisplayProperties.FlexDirection, value)}
        options={directionOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperties.FlexDirection],
        )}
      />
      <SegmentedSelect
        label="Justify"
        onChange={(value) => setStyle(DisplayProperties.JustifyContent, value)}
        options={justifyOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperties.JustifyContent],
        )}
      />
      <SegmentedSelect
        label="Align"
        onChange={(value) => setStyle(DisplayProperties.AlignItems, value)}
        options={alignOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperties.AlignItems],
        )}
      />
      <Row align="middle" justify="space-between" wrap={false}>
        <Col className="text-[12px]">Gap</Col>
        <Col>
          <Row className="space-x-1" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(
                DefaultDisplayProperties[DisplayProperties.ColumnGap],
              )}
              onChange={(value) => setStyle(DisplayProperties.ColumnGap, value)}
            />
            <ValuePicker
              currentValue={getCurrentStyle(
                DefaultDisplayProperties[DisplayProperties.RowGap],
              )}
              onChange={(value) => setStyle(DisplayProperties.RowGap, value)}
            />
          </Row>
        </Col>
      </Row>
      <Divider className="my-2" />
      <SegmentedSelect
        label="Children"
        onChange={(value) => setStyle(DisplayProperties.FlexWrap, value)}
        options={wrapOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperties.FlexWrap],
        )}
      />
    </Col>
  )
}
