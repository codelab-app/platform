import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { UpdateFieldPopoverContainer } from '@codelab/frontend-application-type/use-cases/update-field'

const Page = async ({ params }: PageProps<'fieldId'>) => {
  const { fieldId } = await params

  return (
    <UpdateFieldPopoverContainer
      context={{
        params: { fieldId },
        type: IRouteType.Type,
      }}
      fieldId={fieldId}
    />
  )
}

export default Page
