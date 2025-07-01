import type { PageProps } from '@codelab/frontend-abstract-types'

import { CreateRedirectPopover } from '@codelab/frontend-application-redirect/use-cases/create-redirect'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'

const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const { params } = await parsePageProps(props)

  return <CreateRedirectPopover params={params} />
}

export default Page
