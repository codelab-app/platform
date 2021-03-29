import { padding } from '@codelab/frontend/style'
import { Col, Image, Row, Space, Typography } from 'antd'
import { range } from 'lodash'
import React from 'react'

export const HomeClients = () => {
  const imageUrl = 'http://via.placeholder.com/80x30'

  return (
    <section id="home-client" style={{ padding: '2rem 0' }}>
      <Row gutter={[padding.sm, padding.sm]} align="middle">
        <Col span={24}>
          <Space
            align="center"
            direction="vertical"
            style={{ display: 'flex' }}
          >
            <Typography.Title level={4}>
              Serving small businesses all around the world
            </Typography.Title>
            <Space align="center" size={50}>
              {range(0, 5).map((_, i) => (
                <Image
                  width="200"
                  src={imageUrl}
                  key={`${i}` as string}
                  preview={false}
                />
              ))}
            </Space>
          </Space>
        </Col>
      </Row>
    </section>
  )
}
