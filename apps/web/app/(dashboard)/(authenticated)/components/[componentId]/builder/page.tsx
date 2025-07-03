import type { PageProps } from '@codelab/frontend-abstract-types'
import type { Metadata } from 'next'

import { IRouteType } from '@codelab/frontend-abstract-application'
import { ComponentBuilderContainer } from '@codelab/frontend-application-builder/use-cases/component-builder'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'

export const metadata: Metadata = {
  title: 'Component Builder | Codelab',
}

const Page = async (props: PageProps<'componentId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return (
    <ComponentBuilderContainer
      context={{
        ...context,
        type: IRouteType.Component,
      }}
    />
  )
}

export default Page
