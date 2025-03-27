import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'

const Page = async ({
  params,
}: PageProps<'appId' | 'interfaceId' | 'pageId'>) => {
  const { appId, interfaceId, pageId } = await params

  return (
    <CreateFieldPopover
      context={{
        params: {
          appId,
          interfaceId,
          pageId,
        },
        type: IRouteType.Page,
      }}
      interfaceId={interfaceId}
    />
  )
}

export default Page
