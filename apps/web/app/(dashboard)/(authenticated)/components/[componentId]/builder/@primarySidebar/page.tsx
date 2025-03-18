import type { ComponentContextParams } from '@codelab/frontend/abstract/application'
import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { ComponentPrimarySidebar } from '@codelab/frontend-application-builder/sections'

const Page = async (props: {
  params: Promise<ComponentContextParams>
  searchParams: Promise<SearchParamsPageProps>
}) => {
  const params = await props.params
  const searchParams = await props.searchParams

  return <ComponentPrimarySidebar params={params} searchParams={searchParams} />
}

export default Page
