import type { ComponentContextParams } from '@codelab/frontend/abstract/application'
import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import {
  ComponentBuilderPrimarySidebar,
  ComponentBuilderPrimarySidebarContainer,
} from '@codelab/frontend-application-builder/sections'

const Page = async (props: { params: Promise<ComponentContextParams> }) => {
  const { componentId } = await props.params

  return <ComponentBuilderPrimarySidebarContainer componentId={componentId} />
}

export default Page
