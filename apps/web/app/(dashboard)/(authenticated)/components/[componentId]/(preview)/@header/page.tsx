import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { ComponentBuilderHeaderContainer } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'componentId'>) => {
  const {
    params: { componentId },
  } = await parsePageProps(props)

  return (
    <ComponentBuilderHeaderContainer
      BuilderResizeMenu={<BuilderResizeMenu />}
      componentId={componentId}
    />
  )
}

export default Page
