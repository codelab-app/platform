import {
  ColumnHeightOutlined,
  PicCenterOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { Col, Divider } from 'antd'
import { SegmentedSelect } from '../components/SegmentedSelect'
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

export const DisplayGridOptions = () => {
  const { getCurrentStyle, setStyle } = useStyle()

  // TODO: add Edit Grid option
  return (
    <Col className="space-y-2">
      <Divider className="my-2" />
      <SegmentedSelect
        label="Align"
        onChange={(val) => setStyle(DisplayProperties.AlignItems, val)}
        options={alignOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperties.AlignItems],
        )}
      />
      <SegmentedSelect
        label=""
        onChange={(val) => setStyle(DisplayProperties.JustifyItems, val)}
        options={justifyOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperties.JustifyItems],
        )}
      />
      <SegmentedSelect
        label="Distribute"
        onChange={(val) => setStyle(DisplayProperties.AlignContent, val)}
        options={alignOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperties.AlignContent],
        )}
      />
      <SegmentedSelect
        label=""
        onChange={(val) => setStyle(DisplayProperties.JustifyContent, val)}
        options={justifyOptions}
        value={getCurrentStyle(
          DefaultDisplayProperties[DisplayProperties.JustifyContent],
        )}
      />
    </Col>
  )
}
