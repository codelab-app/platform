import styled from '@emotion/styled'
import { Divider, PageHeader } from 'antd'
import React from 'react'
import { GlobalStyles } from 'twin.macro'

type MainPaneTemplateProps = {
  title: string
  // For buttons
  header?: React.ReactElement | Array<React.ReactElement>
  // For content
  children: React.ReactElement | Array<React.ReactElement>
}

const StyledContainer = styled.div`
  .ant-page-header {
    /* display: grid;
    grid-template-rows: min-content 1fr;
    height: 100vh;
    max-height: 100vh; */
    .ant-page-header-content {
      overflow-y: auto;
    }
    .ant-page-header-heading {
      align-items: baseline;
    }
  }
`

export const MainPaneTemplate = ({
  children,
  header,
  title,
}: MainPaneTemplateProps) => {
  const extra = header && Array.isArray(header) ? header : [header]

  return (
    <StyledContainer>
      <GlobalStyles />
      <PageHeader title={title} extra={[...extra]}>
        <Divider tw="mt-0" />
        {children}
      </PageHeader>
    </StyledContainer>
  )
}
