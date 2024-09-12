import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { ComponentDetailHeader } from '@codelab/frontend-application-component/views'

const Page = ({
  params: { componentId },
}: {
  params: { componentId: string }
}) => {
  return (
    <ComponentDetailHeader
      BuilderResizeMenu={<BuilderResizeMenu />}
      componentId={componentId}
    />
  )
}

export default Page
