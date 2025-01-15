import type { DashboardLayoutProps } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

import { LayoutContainer } from './layout.container'

type LayoutProps = DashboardLayoutProps<
  'configPane' | 'header' | 'modal' | 'primarySidebar' | 'secondaryPopover',
  'appId' | 'pageId'
>

const Layout = async ({
  children,
  configPane,
  header,
  modal,
  params,
  primarySidebar,
  secondaryPopover,
}: LayoutProps) => {


  const { appId, pageId } = params
  const dto = await appBuilderQuery({ appId })

  return (
    <DomainStoreHydrator
      actionsDto={dto.actions}
      appsDto={[dto.app]}
      atomsDto={dto.atoms}
      authGuardsDto={dto.authGuards}
      componentsDto={dto.components}
      elementsDto={dto.elements}
      fallback={<Spinner />}
      fieldsDto={dto.fields}
      pagesDto={dto.pages}
      propsDto={dto.props}
      redirectsDto={dto.redirects}
      resourcesDto={dto.resources}
      storesDto={dto.stores}
      tagsDto={dto.tags}
      typesDto={dto.types}
    >
      <LayoutContainer pageId={pageId}>
        <DashboardLayout<
          | 'configPane'
          | 'header'
          | 'modal'
          | 'primarySidebar'
          | 'secondaryPopover',
          'appId' | 'pageId'
        >
          configPane={configPane}
          header={header}
          modal={modal}
          params={params}
          primarySidebar={primarySidebar}
          secondaryPopover={secondaryPopover}
        >
          {children}
        </DashboardLayout>
      </LayoutContainer>
    </DomainStoreHydrator>
  )
}

export default Layout
