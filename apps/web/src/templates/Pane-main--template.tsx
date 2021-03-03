import { CloseOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React from 'react'
import { usePage } from '../useCases/pages/usePage'
import { LayoutPaneVisibility } from './layout-state'

const { Title } = Typography

type PaneMainTemplateProps = {
  title: string
  // For buttons
  header: React.ReactElement | Array<React.ReactElement>
  // For content
  children: React.ReactElement | Array<React.ReactElement>
}

export const PaneMainTemplate = (props: PaneMainTemplateProps) => {
  const { setPaneVisibility } = usePage()

  return (
    <div style={{ padding: '1rem' }}>
      <Space align="end" style={{ width: '100%' }}>
        <Title level={2} style={{ marginBottom: 0, lineHeight: 0.8 }}>
          {props.title}
        </Title>
        <CloseOutlined
          onClick={() => setPaneVisibility(LayoutPaneVisibility.None)}
        />
        <div>{props.header}</div>
      </Space>
      <div>{props.children}</div>
    </div>
  )
}
