import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { ComponentDetailHeaderContainer } from '@codelab/frontend-application-component/views'

const Page = async ({
  params,
}: {
  params: Promise<{ componentId: string }>
}) => {
  const { componentId } = await params

  return (
    <ComponentDetailHeaderContainer
      BuilderResizeMenu={<BuilderResizeMenu />}
      componentId={componentId}
    />
  )
}

export default Page
