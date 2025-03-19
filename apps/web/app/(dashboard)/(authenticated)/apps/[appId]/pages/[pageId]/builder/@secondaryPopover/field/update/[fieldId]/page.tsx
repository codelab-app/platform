import { IRouteType } from '@codelab/frontend/abstract/application'
import { UpdateFieldPopoverContainer } from '@codelab/frontend-application-type/use-cases/update-field'

const Page = async ({
  params,
}: {
  params: Promise<{ fieldId: string; appId: string; pageId: string }>
}) => {
  const { appId, fieldId, pageId } = await params

  return (
    <UpdateFieldPopoverContainer
      context={{
        params: { appId, fieldId, pageId },
        type: IRouteType.Page,
      }}
      fieldId={fieldId}
    />
  )
}

export default Page
