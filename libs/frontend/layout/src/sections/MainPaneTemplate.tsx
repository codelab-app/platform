import styled from '@emotion/styled'
import { Divider, PageHeader } from 'antd'
import React from 'react'
import { GlobalStyles } from 'twin.macro'

type MainPaneTemplateProps = React.PropsWithChildren<{
  title: React.ReactNode
  // For buttons
  header?: React.ReactElement | Array<React.ReactElement>
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}>

const StyledContainer = styled.div`
  height: 100%;

  .ant-page-header {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;

    .ant-page-header-content {
      overflow-y: auto;
    }
    .ant-page-header-heading {
      align-items: center;
    }
  }
`

export const MainPaneTemplate = ({
  children,
  header,
  title,
  containerProps,
}: MainPaneTemplateProps) => {
  const extra = header && Array.isArray(header) ? header : [header]

  return (
    <StyledContainer {...containerProps}>
      <GlobalStyles />
      <PageHeader title={title} extra={[...extra]}>
        <Divider tw="mt-0" />
        {children}
      </PageHeader>
    </StyledContainer>
  )
}
