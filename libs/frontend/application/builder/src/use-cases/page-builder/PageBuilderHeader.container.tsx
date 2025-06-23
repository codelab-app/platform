'use client'

import type { PageContextParams } from '@codelab/frontend-abstract-application'

import { AppConnector, PageConnector } from '@codelab/frontend-infra-connector'

import { BuilderResizeMenu } from '../resize'
import { PageBuilderHeader } from './PageBuilderHeader'

export const PageBuilderHeaderContainer = ({
  appId,
  pageId,
}: PageContextParams) => {
  return (
    <AppConnector id={appId}>
      {(app) => (
        <PageConnector id={pageId}>
          {(page) => (
            <PageBuilderHeader
              BuilderResizeMenu={<BuilderResizeMenu />}
              app={app}
              page={page}
            />
          )}
        </PageConnector>
      )}
    </AppConnector>
  )
}
