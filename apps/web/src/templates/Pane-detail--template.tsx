import { Space } from 'antd'
import React from 'react'

type PaneDetailTemplateProps = {
  // For buttons
  header: React.ReactElement
  // For content
  children: React.ReactElement
}

export const PaneDetailTemplate = (props: PaneDetailTemplateProps) => {
  return (
    <div style={{ margin: '1rem' }}>
      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        {props.header}
      </Space>
      {props.children}
    </div>
  )
}
