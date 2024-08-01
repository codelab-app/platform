import { appBuilderQuery } from '@codelab/frontend-application-app/use-cases/app-builder'
import { PageBuilder } from '@codelab/frontend-application-builder/use-cases/page-builder'
import { RootRenderer } from '@codelab/frontend-application-renderer/use-cases/root-renderer'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import React from 'react'
import { StoreHydrator } from '../../../../../../components'

const PageBuilderPage = async ({
  params: { appSlug, pageSlug },
}: {
  params: {
    pageSlug: string
    appSlug: string
  }
}) => {
  const user = await getServerUser()
  const dto = await appBuilderQuery({ appSlug, pageSlug, userId: user.id })

  return (
    <StoreHydrator
      actions={dto.actions}
      apps={[dto.app]}
      atoms={dto.atoms}
      authGuards={dto.authGuards}
      components={dto.components}
      elements={dto.elements}
      fields={dto.fields}
      pages={dto.pages}
      props={dto.props}
      redirects={dto.redirects}
      resources={dto.resources}
      stores={dto.stores}
      types={dto.types}
    >
      {/* Decouple renderer from builder */}
      <PageBuilder RootRenderer={RootRenderer} pageSlug={pageSlug} />
    </StoreHydrator>
  )
}

export default PageBuilderPage
