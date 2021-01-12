import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Card, Col, Image, Row, Typography } from 'antd'
import React from 'react'
import { padding, twoGridCol } from '@codelab/frontend'

const { Title } = Typography

export const HomeJumbo = () => {
  const titleStyle = {
    fontSize: '2.75rem',
    lineHeight: 1.5,
  }

  const subtitleStyle = {
    fontSize: '1.2em',
    lineHeight: 1.5,
  }

  return (
    <Row gutter={[padding.sm, padding.sm]} align="middle">
      <Col {...twoGridCol}>
        <Card>
          <Title style={titleStyle}>
            Rapidly Deliver Production Grade User Interface
          </Title>
          <p style={subtitleStyle}>
            The process of choose a tech stack & managing frontend state can be
            a challenging task in the ever-so evolving JavaScript ecosystem.
          </p>
          <p style={subtitleStyle}>
            We have abstracted everything you need to build out a robust
            frontend web application.
          </p>
          <Button size="large" icon={<ArrowRightOutlined />} type="primary">
            Start Building Now
          </Button>
        </Card>
      </Col>
      <Col {...twoGridCol}>
        <Image src="http://via.placeholder.com/1080x1080" />
      </Col>
    </Row>
  )
}
