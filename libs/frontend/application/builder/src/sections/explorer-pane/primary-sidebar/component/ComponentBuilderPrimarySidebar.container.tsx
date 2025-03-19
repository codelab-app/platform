import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { ComponentConnector } from '@codelab/frontend-application-component/views'

import { ComponentBuilderPrimarySidebar } from './ComponentBuilderPrimarySidebar'

export const ComponentBuilderPrimarySidebarContainer = ({
  componentId,
}: {
  componentId: string
}) => {
  return (
    <ComponentConnector id={componentId}>
      {(component) => <ComponentBuilderPrimarySidebar component={component} />}
    </ComponentConnector>
  )
}
