import { PageHeader } from 'antd'
import React from 'react'

type PaneMainTemplateProps = {
  title: string
  // For buttons
  header?: React.ReactElement | Array<React.ReactElement>
  // For content
  children: React.ReactElement | Array<React.ReactElement>
}

export const PaneMainTemplate = ({
  children,
  header,
  title,
}: PaneMainTemplateProps) => {

  const extra = header && Array.isArray(header) ? header : [header]

  return (
    <div>
      <PageHeader
        className="site-page-header-responsive"
        title={title}
        extra={[...extra]}
      >
        {children}
      </PageHeader>
    </div>
  )
}
