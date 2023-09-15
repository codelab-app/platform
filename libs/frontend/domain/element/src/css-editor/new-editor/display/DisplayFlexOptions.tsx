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
import { DefaultDisplayProperties, DisplayProperty } from './properties'

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
        onChange={(value) => setStyle(DisplayProperty.FlexDirection, value)}
        options={directionOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperty.FlexDirection],
        )}
      />
      <SegmentedSelect
        label="Justify"
        onChange={(value) => setStyle(DisplayProperty.JustifyContent, value)}
        options={justifyOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperty.JustifyContent],
        )}
      />
      <SegmentedSelect
        label="Align"
        onChange={(value) => setStyle(DisplayProperty.AlignItems, value)}
        options={alignOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperty.AlignItems],
        )}
      />
      <Row align="middle" justify="space-between" wrap={false}>
        <Col className="text-[12px]" span={9}>
          Gap
        </Col>
        <Col>
          <Row className="space-x-1" wrap={false}>
            <ValuePicker
              currentValue={getCurrentStyle(
                DefaultDisplayProperties[DisplayProperty.ColumnGap],
              )}
              onChange={(value) => setStyle(DisplayProperty.ColumnGap, value)}
            />
            <ValuePicker
              currentValue={getCurrentStyle(
                DefaultDisplayProperties[DisplayProperty.RowGap],
              )}
              onChange={(value) => setStyle(DisplayProperty.RowGap, value)}
            />
          </Row>
        </Col>
      </Row>
      <Divider className="my-2" />
      <SegmentedSelect
        label="Children"
        onChange={(value) => setStyle(DisplayProperty.FlexWrap, value)}
        options={wrapOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperty.FlexWrap],
        )}
      />
    </Col>
  )
}
