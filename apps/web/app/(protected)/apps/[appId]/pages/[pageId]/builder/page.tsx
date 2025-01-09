import type { PageContextParams } from '@codelab/frontend/abstract/types'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { serverTracker } from '@codelab/frontend/infra/logger/server'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { PageBuilderConnector } from './page.connector'

const Page = async ({
  params: { appId, pageId },
}: {
  params: PageContextParams
}) => {
  serverTracker.useEvent({ componentName: 'PageBuilder', event: 'rendered' })

  return <PageBuilderConnector pageId={pageId} />
}

Page.displayName = 'Page'

export default Page
