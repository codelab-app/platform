import type { PageProps } from '@codelab/frontend/abstract/types'

import { DomainsPageHeaderContainer } from '@codelab/frontend-application-domain/views'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'appId'>) => {
  const {
    params: { appId },
  } = await parsePageProps(props)

  return <DomainsPageHeaderContainer appId={appId} />
}

export default Page
