import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { PageBuilderHeaderContainer } from '@codelab/frontend-application-builder/use-cases/page-builder'

const Page = async ({ params }: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return <PageBuilderHeaderContainer appId={appId} pageId={pageId} />
}

Page.displayName = 'Header'

export default Page
