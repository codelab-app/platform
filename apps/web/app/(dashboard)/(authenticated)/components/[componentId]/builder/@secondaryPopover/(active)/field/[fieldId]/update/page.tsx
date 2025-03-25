import { IRouteType } from '@codelab/frontend/abstract/application'
import { UpdateFieldPopoverContainer } from '@codelab/frontend-application-type/use-cases/update-field'

const Page = async ({
  params,
}: {
  params: Promise<{ componentId: string; fieldId: string }>
}) => {
  const { componentId, fieldId } = await params

  return (
    <UpdateFieldPopoverContainer
      context={{
        params: { componentId, fieldId },
        type: IRouteType.Component,
      }}
      fieldId={fieldId}
    />
  )
}

export default Page
