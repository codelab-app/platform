import { Row } from 'antd'
import React from 'react'
import {
  alignFullGridStyle,
  // cardStyle,
  padding,
  threeGridCol,
} from '../styles/style'

export const Features = () => {
  const colProps = {
    ...threeGridCol,
    style: {
      ...alignFullGridStyle,
    },
  }

  return (
    <Row align="middle" gutter={[padding.sm, padding.sm]}>
      {/* <Col {...colProps}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<AppstoreOutlined />}
            description="Create your own component tree and configure with props as you would in React or Angular"
            title="UI for Developers"
          />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<ApiOutlined />}
            description="Render components with data fetched from remote API's"
            title="Component Data Binding"
          />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<KeyOutlined />}
            description="Attach secure custom handlers to components to handle more complex interactions"
            title="Sandboxed Functions"
          />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<FolderOpenOutlined />}
            description="We've wrapped popular frameworks like Antd Design or Material UI so you can configure them without having to code"
            title="Component Frameworks"
          />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<SettingOutlined />}
            description="Compose new components from base components and reuse them across your application"
            title="Custom Components"
          />
        </Card>
      </Col>
      <Col {...threeGridCol}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<EditOutlined />}
            description="Without being confined to pre-made templates, you as a developer can build complex user interface without a code editor"
            title="Low-level Building Block"
          />
        </Card>
      </Col> */}
    </Row>
  )
}
