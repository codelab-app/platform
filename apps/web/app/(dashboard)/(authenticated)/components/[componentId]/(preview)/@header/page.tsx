import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { ComponentBuilderHeaderContainer } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'

const Page = async ({ params }: PageProps<'componentId'>) => {
  const { componentId } = await params

  return (
    <ComponentBuilderHeaderContainer
      BuilderResizeMenu={<BuilderResizeMenu />}
      componentId={componentId}
    />
  )
}

export default Page
