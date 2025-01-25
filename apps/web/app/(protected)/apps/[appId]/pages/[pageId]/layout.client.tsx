'use client'

import type { IAppBuilderDto } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { RendererType } from '@codelab/frontend/abstract/application'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { useSearchParamsProps } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { useSearchParams } from 'next/navigation'

export const LayoutClient = ({
  children,
  dto,
  pageId,
}: {
  children: ReactNode
  pageId: string
  dto: IAppBuilderDto
}) => {
  const searchParams = useSearchParamsProps()
  const { pageDomainService } = useDomainStore()
  const page = pageDomainService.page(pageId)

  return (
    <ApplicationStoreHydrator
      fallback={<Spinner />}
      searchParams={searchParams}
    >
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
        <BuilderProvider
          containerNode={page}
          rendererType={RendererType.Preview}
        >
          {children}
        </BuilderProvider>
      </DomainStoreHydrator>
    </ApplicationStoreHydrator>
  )
}
