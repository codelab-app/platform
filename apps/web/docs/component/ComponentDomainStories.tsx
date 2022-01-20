import { D3Graph, D3Tree } from '@codelab/ui/d3'
import { Col, Layout, Row } from 'antd'
import React from 'react'
import { componentData } from './component.data'
import { componentSchema } from './component-schema.data'

export const ComponentDomainStories = () => {
  return (
    <Layout>
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <D3Graph {...componentSchema} height={400} width={400} />
        </Col>
        <Col span={12}>
          <D3Tree data={componentData} />
        </Col>
      </Row>
    </Layout>
  )
}
