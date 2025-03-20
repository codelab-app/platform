import { IRouteType } from '@codelab/frontend/abstract/application'
import { ConfigPaneInspectorTabGroupContainer } from '@codelab/frontend-application-builder/sections'

const Page = async ({
  params,
}: {
  params: Promise<{ componentId: string }>
}) => {
  const { componentId } = await params

  return (
    <ConfigPaneInspectorTabGroupContainer
      context={{
        params: {
          componentId,
        },
        type: IRouteType.Component,
      }}
    />
  )
}

export default Page
