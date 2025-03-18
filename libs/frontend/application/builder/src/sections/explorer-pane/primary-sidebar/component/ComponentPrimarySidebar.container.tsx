import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import { ComponentConnector } from '@codelab/frontend-application-component/views'

import { ComponentPrimarySidebar } from './ComponentPrimarySidebar'

export const ComponentPrimarySidebarContainer = ({
  componentId,
  searchParams,
}: {
  componentId: string
  searchParams: SearchParamsPageProps
}) => {
  return (
    <ComponentConnector id={componentId}>
      {(component) => (
        <ComponentPrimarySidebar
          component={component}
          params={{
            componentId,
          }}
          searchParams={searchParams}
        />
      )}
    </ComponentConnector>
  )
}
