import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { CreateElementPopover } from '@codelab/frontend-application-element/use-cases/create-element'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'appId' | 'pageId'>) => {
  const context = await parsePageProps(props)

  return (
    <CreateElementPopover
      context={{
        ...context,
        type: IRouteType.Page,
      }}
    />
  )
}

export default Page
