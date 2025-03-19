import { ComponentConnector } from '@codelab/frontend/infra/connector'

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
