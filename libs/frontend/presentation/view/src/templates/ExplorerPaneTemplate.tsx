import type { PageHeaderProps } from '@ant-design/pro-components/lib'
import { PageHeader } from '@ant-design/pro-components/lib'
import type { ReactNode } from 'react'
import React from 'react'
import { css } from 'styled-components'
import styles from './ExplorerPaneTemplate.module.css'

export type MainPaneTemplateProps = React.PropsWithChildren<{
  containerProps?: Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'onClick'
  >
  // For buttons
  header?: ReactNode
  headerProps?: Pick<PageHeaderProps, 'onBack'>
  title: React.ReactNode
  'data-testid'?: string
}>

export const ExplorerPaneTemplate = ({
  children,
  containerProps,
  'data-testid': dataTestId,
  header,
  headerProps,
  title,
}: MainPaneTemplateProps) => {
  return (
    <div
      className={styles.container}
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
    </div>
  )
}
