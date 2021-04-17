import { PageHeader } from 'antd'
import React from 'react'
import styled from '@emotion/styled'

type PaneMainTemplateProps = {
  title: string
  // For buttons
  header?: React.ReactElement | Array<React.ReactElement>
  // For content
  children: React.ReactElement | Array<React.ReactElement>
}

const StyledContainer = styled.div`
  .ant-page-header {
    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100vh;
    max-height: 100vh;

    .ant-page-header-content {
      overflow-y: auto;
    }
  }
`

export const PaneMainTemplate = ({
  children,
  header,
  title,
}: PaneMainTemplateProps) => {
  const extra = header && Array.isArray(header) ? header : [header]

  return (
    <StyledContainer>
      <PageHeader
        className={`site-page-header-responsive`}
        title={title}
        extra={[...extra]}
      >
        {children}
      </PageHeader>
    </StyledContainer>
  )
}
