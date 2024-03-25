import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { BuilderViewLayout } from '@codelab/frontend/application/builder'
import { PageDetailHeader } from '@codelab/frontend/application/page'
import { RootRenderer } from '@codelab/frontend/application/renderer'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import {
  useCurrentComponent,
  useRenderedComponent,
} from '@codelab/frontend/presentation/container'
import { DynamicDashboardTemplate } from '@codelab/frontend/presentation/view'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'

const ComponentPreviewView: CodelabPage = observer(() => {
  const { componentName } = useCurrentComponent()

  const [{ error, result, status }, loadCurrentComponent] =
    useRenderedComponent(RendererType.Preview)

  const isLoading = status !== 'success'

  useEffect(() => {
    void loadCurrentComponent.execute()
  }, [componentName])

  return (
    <DynamicDashboardTemplate Header={PageDetailHeader} headerHeight={48}>
      <Head>
        <title>{componentName} | Preview | Codelab</title>
      </Head>

      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {isLoading && <Spin />}
      {result?.elementTree && <RootRenderer renderer={result.renderer} />}
    </DynamicDashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRedirect()

ComponentPreviewView.Layout = BuilderViewLayout

export default ComponentPreviewView
