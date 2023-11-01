import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { BuilderContext } from '@codelab/frontend/application/builder'
import { PageDetailHeader } from '@codelab/frontend/application/page'
import { RootRenderer } from '@codelab/frontend/application/renderer'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import {
  useCurrentComponent,
  useRenderedComponent,
} from '@codelab/frontend/presentation/container'
import { DashboardTemplate } from '@codelab/frontend/presentation/view'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'

const ComponentRenderer: CodelabPage = observer(() => {
  const { componentName } = useCurrentComponent()

  const [{ error, result, status }, loadCurrentComponent] =
    useRenderedComponent(RendererType.Preview)

  const isLoading = status !== 'success'

  useEffect(() => {
    void loadCurrentComponent.execute()
  }, [componentName])

  return (
    <DashboardTemplate Header={PageDetailHeader} headerHeight={48}>
      <Head>
        <title>{componentName} | Preview | Codelab</title>
      </Head>

      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {isLoading && <Spin />}
      {result?.elementTree && <RootRenderer renderer={result.renderer} />}
    </DashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRedirect()

ComponentRenderer.Layout = observer(({ children }) => {
  return <BuilderContext>{children()}</BuilderContext>
})

export default ComponentRenderer

ComponentRenderer.displayName = 'ComponentRenderer'
