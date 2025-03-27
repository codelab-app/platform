import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { PageHeader } from '@codelab/frontend-application-builder/components'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'

const Page = async (props: PageProps<'componentId'>) => {
  const {
    params: { componentId },
  } = await parsePageProps(props)

  return <PageHeader componentId={componentId} type={IRouteType.Component} />
}

export default Page
