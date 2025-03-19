import { IRouteType } from '@codelab/frontend/abstract/application'
import { ConfigPaneInspectorTabGroupContainer } from '@codelab/frontend-application-builder/sections'

const Page = async ({
  params,
}: {
  params: Promise<{ appId: string; pageId: string }>
}) => {
  const { appId, pageId } = await params

  return (
    <ConfigPaneInspectorTabGroupContainer
      context={({ fieldId }) => ({
        params: {
          appId,
          fieldId,
          pageId,
        },
        type: IRouteType.Page,
      })}
    />
  )
}

export default Page
