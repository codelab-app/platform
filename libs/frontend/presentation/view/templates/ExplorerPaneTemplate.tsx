import type { PageHeaderProps } from '@ant-design/pro-components/lib'
import { PageHeader } from '@ant-design/pro-components/lib'
import { css } from '@emotion/react'
import type { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import styled from '@emotion/styled'
import React from 'react'
import tw from 'twin.macro'

export type MainPaneTemplateProps = React.PropsWithChildren<{
  containerProps?: Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'onClick'
  >
  // For buttons
  header?: ReactJSXElement
  headerProps?: Pick<PageHeaderProps, 'onBack'>
  title: React.ReactNode
  'data-testid'?: string
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
  'data-testid': dataTestId,
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
      data-testid={dataTestId}
      onClick={containerProps?.onClick}
    >
      <PageHeader
        extra={header}
        onBack={headerProps?.onBack}
        style={{ maxHeight: '100%' }}
        title={title}
      >
        <div
          css={css`
            max-height: 100%;
            height: 100%;
          `}
        >
          {children}
        </div>
      </PageHeader>
    </StyledContainer>
  )
}
