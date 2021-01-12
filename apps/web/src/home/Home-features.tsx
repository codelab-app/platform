import {
  ApiOutlined,
  AppstoreOutlined,
  EditOutlined,
  FolderOpenOutlined,
  KeyOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import React from 'react'
import { cardStyle, padding, threeGridCol } from '@codelab/frontend'

export const HomeFeatures = () => {
  return (
    <Row gutter={[padding.sm, padding.sm]} align="middle">
      <Col {...threeGridCol}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<AppstoreOutlined />}
            title="UI for Developers"
            description="Create your own component tree and configure with props as you would in React or Angular"
          />
        </Card>
      </Col>
      <Col {...threeGridCol}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<ApiOutlined />}
            title="Component Data Binding"
            description="Render components with data fetched from remote API's"
          />
        </Card>
      </Col>
      <Col {...threeGridCol}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<KeyOutlined />}
            title="Sandboxed Functions"
            description="Attach secure custom handlers to components to handle more complex interactions"
          />
        </Card>
      </Col>
      <Col {...threeGridCol}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<FolderOpenOutlined />}
            title="Component Frameworks"
            description="We've wrapped popular frameworks like Antd Design or Material UI so you can configure them without having to code"
          />
        </Card>
      </Col>
      <Col {...threeGridCol}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<SettingOutlined />}
            title="Custom Components"
            description="Compose new components from base components and reuse them across your application"
          />
        </Card>
      </Col>
      <Col {...threeGridCol}>
        <Card style={cardStyle}>
          <Card.Meta
            avatar={<EditOutlined />}
            title="Low-level Building Block"
            description="Without being confined to pre-made templates, you as a developer can build complex user interface without a code editor"
          />
        </Card>
      </Col>
    </Row>
  )
}
