import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { DomainsPageHeaderContainer } from '@codelab/frontend-application-domain/views'

const Page = async ({ params }: PageProps<'appId'>) => {
  const { appId } = await params

  return <DomainsPageHeaderContainer appId={appId} />
}

export default Page
