import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'

const Page = async ({ params }: PageProps<'componentId' | 'interfaceId'>) => {
  const { componentId, interfaceId } = await params

  return (
    <CreateFieldPopover
      context={{
        params: {
          componentId,
          interfaceId,
        },
        type: IRouteType.Component,
      }}
      interfaceId={interfaceId}
    />
  )
}

export default Page
