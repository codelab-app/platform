import { css } from '@emotion/react'
import type { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import styled from '@emotion/styled'
import type { PageHeaderProps } from 'antd'
import { PageHeader } from 'antd'
import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'

export type MainPaneTemplateProps = React.PropsWithChildren<{
  title: React.ReactNode
  // For buttons
  header?: ReactJSXElement
  containerProps?: Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'onClick'
  >
  headerProps?: Pick<PageHeaderProps, 'onBack'>
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

export const ExplorerPaneTemplate = ({
  children,
  containerProps,
  header,
  headerProps,
  title,
}: MainPaneTemplateProps) => {
  return (
    <StyledContainer
      css={css`
        max-height: 100%;
        overflow: auto;
      `}
      onClick={containerProps?.onClick}
    >
      <GlobalStyles />
      <PageHeader
        extra={header}
        onBack={headerProps?.onBack}
        style={{ maxHeight: '100%' }}
        title={title}
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
