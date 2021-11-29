import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { PageHeader, PageHeaderProps } from 'antd'
import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'

export type MainPaneTemplateProps = React.PropsWithChildren<{
  title: React.ReactNode
  // For buttons
  header?: React.ReactElement | Array<React.ReactElement>
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  headerProps?: PageHeaderProps
}>

const StyledContainer = styled.div`
  height: 100%;
  max-height: 100%;

  .ant-page-header {
    height: 100%;
    max-height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    padding-left: 0;
    padding-right: 0;

    .ant-page-header-content {
      ${tw`px-4`}
      max-height: 100%;
      min-height: 0;
      overflow-y: auto;
    }
    .ant-page-header-heading {
      ${tw`px-4 mt-2`}
      align-items: center;
    }
  }
`

export const MainPaneTemplate = ({
  children,
  header,
  title,
  containerProps,
  headerProps,
}: MainPaneTemplateProps) => {
  const extra = header && Array.isArray(header) ? header : [header]

  return (
    <StyledContainer
      css={css`
        max-height: 100%;
        overflow: auto;
      `}
      {...containerProps}
    >
      <GlobalStyles />
      <PageHeader
        title={title}
        extra={[...extra]}
        style={{ maxHeight: '100%', ...(headerProps?.style ?? {}) }}
        {...(headerProps || {})}
      >
        <div
          css={css`
            max-height: 100%;
          `}
        >
          {children}
        </div>
      </PageHeader>
    </StyledContainer>
  )
}
