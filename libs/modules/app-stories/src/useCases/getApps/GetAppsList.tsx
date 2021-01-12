import { Col, Row } from 'antd'
import React from 'react'
import { cardStyle, threeGridCol } from '@codelab/frontend'

export const GetAppsList = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col className="gutter-row" span={8} {...threeGridCol}>
        <div style={cardStyle}>col-6</div>
      </Col>
      <Col className="gutter-row" span={8} {...threeGridCol}>
        <div style={cardStyle}>col-6</div>
      </Col>
      <Col className="gutter-row" span={8} {...threeGridCol}>
        <div style={cardStyle}>col-6</div>
      </Col>
      <Col className="gutter-row" span={8} {...threeGridCol}>
        <div style={cardStyle}>col-6</div>
      </Col>
    </Row>
  )
}
