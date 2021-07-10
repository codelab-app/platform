import { D3Graph } from '@codelab/ui/d3'
import { Col, Layout, Row } from 'antd'
import React from 'react'
import { appData } from './app-data.data'
import { appSchema } from './app-schema.data'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DomainDocs = require('./domain-docs.mdx')

export default {
  title: 'Domain',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      page: DomainDocs,
    },
  },
}

export const UserDomain = () => {
  return (
    <Layout>
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <D3Graph {...appSchema} width={400} height={400} />
        </Col>
        <Col span={12}>
          <D3Graph {...appData} width={400} height={400} />
        </Col>
      </Row>
    </Layout>
  )
}
