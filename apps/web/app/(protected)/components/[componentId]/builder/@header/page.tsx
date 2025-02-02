import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { ComponentDetailHeader } from '@codelab/frontend-application-component/views'

const Page = async (
  props: {
    params: Promise<{ componentId: string }>
  }
) => {
  const params = await props.params;

  const {
    componentId
  } = params;

  return (
    <ComponentDetailHeader
      BuilderResizeMenu={<BuilderResizeMenu />}
      componentId={componentId}
    />
  )
}

export default Page
