import styled from '@emotion/styled'
import { Divider, PageHeader } from 'antd'
import React from 'react'
import xw from 'xwind'

type MainPaneTemplateProps = {
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

export const MainPaneTemplate = ({
  children,
  header,
  title,
}: MainPaneTemplateProps) => {
  const extra = header && Array.isArray(header) ? header : [header]

  return (
    <StyledContainer>
      <PageHeader title={title} extra={[...extra]}>
        <Divider style={xw`mt-0`} />
        {children}
      </PageHeader>
    </StyledContainer>
  )
}
