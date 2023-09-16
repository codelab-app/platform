import {
  ColumnHeightOutlined,
  PicCenterOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { Col, Divider } from 'antd'
import { SegmentedSelect } from '../components'
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

export const DisplayGridOptions = () => {
  const { getCurrentStyle, setStyle } = useStyle()

  // TODO: add Edit Grid option
  return (
    <Col className="space-y-2">
      <Divider className="my-2" />
      <SegmentedSelect
        label="Align"
        onChange={(val) => setStyle(CssProperty.AlignItems, val)}
        options={alignOptions}
        value={getCurrentStyle(CssProperty.AlignItems)}
      />
      <SegmentedSelect
        label=""
        onChange={(val) => setStyle(CssProperty.JustifyItems, val)}
        options={justifyOptions}
        value={getCurrentStyle(CssProperty.JustifyItems)}
      />
      <SegmentedSelect
        label="Distribute"
        onChange={(val) => setStyle(CssProperty.AlignContent, val)}
        options={alignOptions}
        value={getCurrentStyle(CssProperty.AlignContent)}
      />
      <SegmentedSelect
        label=""
        onChange={(val) => setStyle(CssProperty.JustifyContent, val)}
        options={justifyOptions}
        value={getCurrentStyle(CssProperty.JustifyContent)}
      />
    </Col>
  )
}
