import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'
import type { Metadata } from 'next'

import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { componentBuilderQuery } from '@codelab/frontend-application-component/use-cases/component-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

import { ComponentPreviewBuilderConnector } from './page.connector'

export const metadata: Metadata = {
  title: 'Component Preview | Codelab',
}

const ComponentPreviewPage = async (props0: {
  params: Promise<{
    componentId: string
  }>
}) => {
  const params = await props0.params
  const { componentId } = params

  return <ComponentPreviewBuilderConnector componentId={componentId} />
}

export default ComponentPreviewPage
