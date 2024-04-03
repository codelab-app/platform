import { RendererType } from '@codelab/frontend/abstract/application'
import { PageType } from '@codelab/frontend/abstract/types'
import { useAppDevelopment } from '@codelab/frontend/application/app'
import { builderRouteChangeHandler } from '@codelab/frontend/application/builder'
import {
  PagePreviewView,
  PagePreviewViewLayout,
} from '@codelab/frontend/application/page'
import { RootRenderer } from '@codelab/frontend/application/renderer'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { useStore } from '@codelab/frontend/application/shared/store'
import { usePageQuery } from '@codelab/frontend/presentation/container'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { Alert, Spin } from 'antd'
import isBoolean from 'lodash/isBoolean'
import isNil from 'lodash/isNil'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const PagePreviewView: PagePreviewView = observer(() => {
  const router = useRouter()
  const { pageService } = useStore()

  const [{ error, result, status }, loadDevelopmentPage] = useAppDevelopment({
    rendererType: RendererType.Preview,
  })

  const { pageName } = usePageQuery()
  const pageNameRef = React.useRef(pageName)

  const routeChangeHandler = React.useMemo(
    () => async (url: string) => {
      if (isNil(result) || isBoolean(result)) {
        return
      }

      const pages = pageService.getPagesByApp(result.app.id)

      await builderRouteChangeHandler(
        router,
        result.app,
        pages,
        url,
        PageType.PageDetail,
      )
    },
    [result, pageName],
  )

  useEffect(() => {
    if (result && !isBoolean(result)) {
      router.events.on('routeChangeStart', routeChangeHandler)
    }

    if (status === 'not-executed' || pageName !== pageNameRef.current) {
      pageNameRef.current = pageName
      void loadDevelopmentPage.execute()
    }

    return () => {
      router.events.off('routeChangeStart', routeChangeHandler)
    }
  }, [pageName, result])

  // boolean means router.push was called from the hook, so will redirect anyways
  if (isBoolean(result)) {
    return null
  }

  return (
    <>
      <Head>
        <title>{result?.page.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {status === 'not-executed' && <Spin />}
      {result?.elementTree && <RootRenderer renderer={result.renderer} />}
    </>
  )
})

export default PagePreviewView

export const getServerSideProps = withPageAuthRedirect()

PagePreviewView.Layout = PagePreviewViewLayout
