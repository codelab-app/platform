import { Col, Row } from 'antd'
import React from 'react'

export const GetAppsList = () => {
  const style = { background: '#0092ff', padding: '8px 0' }

  const responsiveSpan = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 8,
  }

  return (
    <Row gutter={[8, 8]}>
      <Col className="gutter-row" span={6} {...responsiveSpan}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6} {...responsiveSpan}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6} {...responsiveSpan}>
        <div style={style}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6} {...responsiveSpan}>
        <div style={style}>col-6</div>
      </Col>
    </Row>
  )
}
