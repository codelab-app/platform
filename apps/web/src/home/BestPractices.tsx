import {
  ApiOutlined,
  AppstoreOutlined,
  FolderOpenOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  alignFullGridStyle,
  cardStyle,
  padding,
  threeGridCol,
} from '@codelab/frontend/view/style'
import { Card, Col, Row, Typography } from 'antd'
import tw from 'twin.macro'

const { Text, Link, Title } = Typography

const colProps = {
  ...threeGridCol,
  style: {
    ...alignFullGridStyle,
  },
}

export const BestPractices = () => {
  return (
    <div>
      <Title css={tw`text-center !font-extrabold`} level={2}>
        Build with best practices: re-use & compose
      </Title>
      <Text>
        Re-use your knowledge of coding and apply them as you would with code.
        Think like a developer, but work more productively using our development
        platform. It’s like a smart IDE on steroids.
      </Text>
      <Row align="middle" gutter={[padding.sm, padding.sm]}>
        <Col {...colProps}>
          <Card style={cardStyle}>
            <Card.Meta
              avatar={<AppstoreOutlined />}
              description="We integrate with existing UI Frameworks such as Ant Design & Material UI so you can keep using the technologies you love. All component behavior can be configured via props"
              title="Build with UI frameworks"
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card style={cardStyle}>
            <Card.Meta
              avatar={<ApiOutlined />}
              description="We provide HTML tags so you can compose your own re-usable component. Choose from unofficial components shared by the community"
              title="Create custom components"
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card style={cardStyle}>
            <Card.Meta
              avatar={<FolderOpenOutlined />}
              description="Construct your DOM tree by composing & nesting components. A component can have multiple children and the same for their children."
              title="Component Nesting"
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card style={cardStyle}>
            <Card.Meta
              avatar={<SettingOutlined />}
              description="Use TailwindCSS to rapidly style your frontend. Bind variables to your styles and create a truly dynamic system"
              title="Modular design system"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
