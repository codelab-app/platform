import type { PageProps } from '@codelab/frontend/abstract/types'

import { ComponentBuilderPrimarySidebarContainer } from '@codelab/frontend-application-builder/sections'

const Page = async ({ params }: PageProps<'componentId'>) => {
  const { componentId } = await params

  return <ComponentBuilderPrimarySidebarContainer componentId={componentId} />
}

export default Page
