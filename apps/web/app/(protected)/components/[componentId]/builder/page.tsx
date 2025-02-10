import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { ComponentBuilderConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'Component Builder | Codelab',
}

const ComponentBuilderPage = async (props: {
  params: Promise<{
    componentId: string
  }>
}) => {
  const params = await props.params
  const { componentId } = params

  return <ComponentBuilderConnector componentId={componentId} />
}

export default ComponentBuilderPage
