import { CodelabPage } from '@codelab/frontend/abstract/types'
import { Page, PageDetailHeader } from '@codelab/frontend/domain/page'
import { Renderer } from '@codelab/frontend/domain/renderer'
import {
  useLoadRenderedPage,
  useStore,
} from '@codelab/frontend/presenter/container'
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import { useAsync } from 'react-use'

const PageRenderer: CodelabPage = observer(() => {
  const { appRenderService } = useStore()
  const { value: pageDataValue, error: pageDataError } = useLoadRenderedPage()

  const {
    loading,
    value,
    error: rendererError,
  } = useAsync(async () => {
    if (!pageDataValue) {
      return
    }

    const { page, pageTree, appTree, appStore } = pageDataValue

    const renderer = appRenderService.addRenderer({
      id: page.id,
      pageTree,
      appTree,
      appStore,
      isBuilder: false,
    })

    return {
      page,
      pageTree,
      renderer,
    }
  }, [pageDataValue])

  const error = pageDataError || rendererError

  return (
    <>
      <Head>
        <title>{value?.page.name}</title>
      </Head>
      {error && <Alert message={extractErrorMessage(error)} type="error" />}
      {loading && <Spin />}
      {!loading && value?.pageTree && (
        <Renderer renderRoot={value.renderer.renderRoot.bind(value.renderer)} />
      )}
    </>
  )
})

export default PageRenderer

export const getServerSideProps = auth0Instance.withPageAuthRequired({
  getServerSideProps: Page.getServerSideProps,
})

PageRenderer.Layout = observer((page) => {
  const { userService, appService, pageService } = useStore()

  return (
    <DashboardTemplate
      Header={observer(() => (
        <PageDetailHeader pageService={pageService} />
      ))}
      headerHeight={48}
    >
      {page.children}
    </DashboardTemplate>
  )
})

PageRenderer.displayName = 'PageRenderer'
