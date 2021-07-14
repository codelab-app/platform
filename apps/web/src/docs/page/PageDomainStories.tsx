import { D3Graph } from '@codelab/ui/d3'
import { Col, Layout, Row } from 'antd'
import React from 'react'
import { pageData } from './page-data.data'
import { pageSchema } from './page-schema.data'

export const PageDomainStories = () => {
  return (
    <Layout>
      <p>
        A Page composed of Element nodes. Think of Element nodes as DOM nodes
        within a page. But Element doesn't contain any node type information on
        it, it only tells us the location within the dom tree.
      </p>
      <p>
        An Element is a self-referencing. Ideally, the schema should only have 1
        Element node, with an arc to itself (couldn't get it working)
      </p>
      <p>
        Which is why we need a Component node, this tells us the type of the
        node it is.
      </p>
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <D3Graph {...pageSchema} width={400} height={400} />
        </Col>
        <Col span={12}>
          <D3Graph {...pageData} width={400} height={400} />
        </Col>
      </Row>
    </Layout>
  )
}
