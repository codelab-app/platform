import type { IPageProps } from '@codelab/frontend/abstract/core'
import { RendererType } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageDetailHeader } from '@codelab/frontend/domain/page'
import { Renderer } from '@codelab/frontend/domain/renderer'
import { useRenderedPage } from '@codelab/frontend/presentation/container'
import { DashboardTemplate } from '@codelab/frontend/presentation/view'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { useMountEffect } from '@react-hookz/web'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const PageRenderer: CodelabPage<IPageProps> = observer(() => {
  const [{ error, result, status }, actions] = useRenderedPage({
    rendererType: RendererType.Preview,
  })

  useMountEffect(actions.execute)

  return (
    <>
      <Head>
        <title>{result?.page.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {status === 'loading' && <Spin />}
      {status === 'success' && result?.elementTree && (
        <Renderer renderer={result.renderer} />
      )}
    </>
  )
})

export default PageRenderer

export const getServerSideProps = withPageAuthRedirect()

PageRenderer.Layout = observer(({ children }) => {
  return (
    <DashboardTemplate
      Header={observer(() => (
        <PageDetailHeader />
      ))}
      headerHeight={48}
    >
      {children()}
    </DashboardTemplate>
  )
})

PageRenderer.displayName = 'PageRenderer'
