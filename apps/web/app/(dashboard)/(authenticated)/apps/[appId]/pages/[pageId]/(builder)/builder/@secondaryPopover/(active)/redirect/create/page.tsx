import type { PageContextParams } from '@codelab/frontend/abstract/application'
import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { CreateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/create-redirect'

const Page = async ({ params }: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return <CreateRedirectPopover params={{ appId, pageId }} />
}

export default Page
