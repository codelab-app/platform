import { RendererType } from '@codelab/frontend/abstract/application'
import { PageType } from '@codelab/frontend/abstract/types'
import { useAppDevelopment } from '@codelab/frontend/application/app'
import { useRouteChangeHandler } from '@codelab/frontend/application/builder'
import {
  PagePreviewView,
  PagePreviewViewLayout,
} from '@codelab/frontend/application/page'
import { RootRenderer } from '@codelab/frontend/application/renderer'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PagePreviewView: PagePreviewView = observer(() => {
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
