import { CloseOutlined } from '@ant-design/icons'
import { PageHeader } from 'antd'
import React from 'react'
import { LayoutPaneVisibility, useLayout } from '../templates/layoutState'

type PaneMainTemplateProps = {
  title: string
  // For buttons
  header: React.ReactElement | Array<React.ReactElement>
  // For content
  children: React.ReactElement | Array<React.ReactElement>
}

export const PaneMainTemplate = ({
  children,
  header,
  title,
}: PaneMainTemplateProps) => {
  const { setPaneVisibility } = useLayout()

  const extra = header && Array.isArray(header) ? header : [header]

  return (
    <div>
      <PageHeader
        className="site-page-header-responsive"
        title={title}
        extra={[
          ...extra,
          <CloseOutlined
            key="close-btn"
            onClick={() => setPaneVisibility(LayoutPaneVisibility.None)}
          />,
        ]}
      >
        {children}
      </PageHeader>
    </div>
  )
}
