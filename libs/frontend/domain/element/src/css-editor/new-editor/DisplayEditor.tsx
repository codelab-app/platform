import {
  AppstoreOutlined,
  EyeInvisibleOutlined,
  GroupOutlined,
  OneToOneOutlined,
  PicCenterOutlined,
} from '@ant-design/icons'
import { Col, Row, Segmented } from 'antd'

const displayOptions = [
  {
    icon: <GroupOutlined />,
    value: 'block',
  },
  {
    icon: <OneToOneOutlined />,
    value: 'flex',
  },
  {
    icon: <AppstoreOutlined />,
    value: 'grid',
  },
  {
    icon: <PicCenterOutlined rotate={90} />,
    value: 'inline-block',
  },
  {
    icon: <PicCenterOutlined />,
    value: 'inline',
  },
  {
    icon: <EyeInvisibleOutlined />,
    value: 'None',
  },
]

interface DisplayEditorProps {
  value: string
  onChange?(value: string): void
}

export const DisplayEditor = ({ onChange, value }: DisplayEditorProps) => {
  return (
    <Row align="middle" justify="space-between" wrap={false}>
      <Col>Display</Col>
      <Col>
        <Segmented
          block={true}
          onChange={(selected) => onChange?.(selected.toString())}
          options={[...displayOptions]}
          value={value}
        />
      </Col>
    </Row>
  )
}
