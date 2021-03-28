import { CloseOutlined } from '@ant-design/icons'
import { Button, List, PageHeader, Space, Typography } from 'antd'
import React from 'react'
import { usePage } from '../useCases/pages/usePage'
import { LayoutPaneVisibility } from './layout-state'
import CreateStyleButton from '../useCases/styles/createStyle/CreateStyleButton'

type PaneMainTemplateProps = {
  title: string
  // For buttons
  header: React.ReactElement | Array<React.ReactElement>
  // For content
  children: React.ReactElement | Array<React.ReactElement>
}

export const PaneMainTemplate = ({ children, header, title }: PaneMainTemplateProps) => {
  const { setPaneVisibility } = usePage()

  const extra = header && Array.isArray(header) ? header : [header];

  return (
    <div>
      <PageHeader
        className='site-page-header-responsive'
        title={title}
        extra={[...extra, <CloseOutlined
          key="close-btn"
          onClick={() => setPaneVisibility(LayoutPaneVisibility.None)}
        />]}
      >
        {children}
      </PageHeader>
    </div>
  )
}
