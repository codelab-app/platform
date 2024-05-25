import { RendererType } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { useAppDevelopment } from '@codelab/frontend-application-app/use-cases/app-development'
import { useRouteChangeHandler } from '@codelab/frontend-application-builder/hooks'
import { PagePreviewViewLayout } from '@codelab/frontend-application-page/views'
import { RootRenderer } from '@codelab/frontend-application-renderer/components'
import { withPageAuthRedirect } from '@codelab/frontend-application-shared-auth'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PagePreviewView: CodelabPage = observer(() => {
  const router = useRouter()

  const [{ error, result, status }, loadDevelopmentPage] = useAppDevelopment({
    rendererType: RendererType.Preview,
  })

  useRouteChangeHandler(result?.app.pages, PageType.PageDetail)

  /**
   * Load the page each time we change the path
   */
  useEffect(() => {
    void loadDevelopmentPage.execute()
  }, [router.asPath])

  if (status === 'loading' || status === 'not-executed') {
    return <Spin />
  }

  if (!result) {
    return null
  }

  return (
    <>
      <Head>
        <title>{result.page.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      <RootRenderer renderer={result.renderer} />
    </>
  )
})

export default PagePreviewView

export const getServerSideProps = withPageAuthRedirect()

PagePreviewView.Layout = PagePreviewViewLayout
