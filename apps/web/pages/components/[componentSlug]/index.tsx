import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { BuilderViewLayout } from '@codelab/frontend/application/builder'
import { useComponentDevelopment } from '@codelab/frontend/application/component'
import { PageDetailHeader } from '@codelab/frontend/application/page'
import { RootRenderer } from '@codelab/frontend/application/renderer'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { useCurrentComponent } from '@codelab/frontend/presentation/container'
import { DynamicDashboardTemplate } from '@codelab/frontend/presentation/view'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'

const ComponentPreviewView: CodelabPage = observer(() => {
  const component = useCurrentComponent()

  const [{ error, result, status }, loadCurrentComponent] =
    useComponentDevelopment({ rendererType: RendererType.Preview })

  const isLoading = status !== 'success'

  useEffect(() => {
    void loadCurrentComponent.execute()
  }, [component?.name])

  return (
    <DynamicDashboardTemplate Header={PageDetailHeader}>
      <Head>
        <title>{component?.name} | Preview | Codelab</title>
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
