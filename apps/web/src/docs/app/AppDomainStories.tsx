import { D3Graph, D3Tree } from '@codelab/ui/d3'
import { Col, Layout, Row } from 'antd'
import React from 'react'
import { appDataTree } from './app-data-tree.data'
import { appSchema } from './app-schema.data'

export const AppDomainStories = () => {
  return (
    <Layout>
      A user creates apps for end-users to access. Apps created here are full
      fledges web applications. Just like Next.js, an app could have many pages.
      We currently don't support nested pages, but will soon get to that.
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <D3Graph {...appSchema} width={400} height={400} />
        </Col>
        <Col span={12}>
          <D3Tree data={appDataTree} />
        </Col>
      </Row>
    </Layout>
  )
}
