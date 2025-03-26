import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'

const Page = async ({ params }: PageProps<'interfaceId'>) => {
  const { interfaceId } = await params

  return (
    <CreateFieldPopover
      context={{
        params: {
          interfaceId,
        },
        type: IRouteType.Type,
      }}
      interfaceId={interfaceId}
    />
  )
}

export default Page
