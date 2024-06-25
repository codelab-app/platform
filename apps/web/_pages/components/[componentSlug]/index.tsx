import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { useCurrentComponent } from '@codelab/frontend/presentation/container'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { BuilderViewLayout } from '@codelab/frontend-application-builder/views'
import { useComponentDevelopment } from '@codelab/frontend-application-component/use-cases/component-development'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'
import { RootRenderer } from '@codelab/frontend-application-renderer/components'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
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
