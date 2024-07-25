import { appDevelopmentQuery } from '@codelab/frontend-application-app/use-cases/app-development'
import { RootRenderer } from '@codelab/frontend-application-renderer/components'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import React from 'react'
import { StoreHydrator } from '../../../../../components'

const PagePreview = async ({
  params: { appSlug, pageSlug },
}: {
  params: {
    pageSlug: string
    appSlug: string
  }
}) => {
  const user = await getServerUser()
  const dto = await appDevelopmentQuery({ appSlug, pageSlug, userId: user.id })

  // const { renderer } = useAppDev({
  //   dto,
  //   pageSlug,
  //   rendererType: RendererType.Preview,
  // })

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
      <RootRenderer renderer={renderer} />
    </StoreHydrator>
  )
}

export default PagePreview
