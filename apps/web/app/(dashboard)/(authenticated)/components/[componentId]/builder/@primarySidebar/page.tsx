import type { ComponentContextParams } from '@codelab/frontend/abstract/application'

import { ComponentBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'

const Page = async ({
  params,
}: {
  params: Promise<ComponentContextParams>
}) => {
  const { componentId } = await params

  return <ComponentBuilderPrimarySidebarContainer componentId={componentId} />
}

export default Page
