import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import {
  ComponentDetailHeader,
  ComponentDetailHeaderContainer,
} from '@codelab/frontend-application-component/views'

const Page = async (props: { params: Promise<{ componentId: string }> }) => {
  const params = await props.params
  const { componentId } = params

  return (
    <ComponentDetailHeaderContainer
      BuilderResizeMenu={<BuilderResizeMenu />}
      componentId={componentId}
    />
  )
}

export default Page
