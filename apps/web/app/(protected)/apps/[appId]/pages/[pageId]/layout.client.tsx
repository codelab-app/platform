'use client'

import type { IAppBuilderDto } from '@codelab/frontend/abstract/domain'

import { useDomainStoreHydrator } from '@codelab/frontend/infra/context'
import { type ReactNode, useEffect } from 'react'

/**
 * Client layout used for hydration and setting provider context
 */
export const LayoutClient = ({
  children,
  dto,
}: {
  children: ReactNode
  dto: IAppBuilderDto
}) => {
  const hydrate = useDomainStoreHydrator()

  useEffect(() => {
    hydrate({
      actionsDto: dto.actions,
      appsDto: [dto.app],
      atomsDto: dto.atoms,
      authGuardsDto: dto.authGuards,
      componentsDto: dto.components,
      elementsDto: dto.elements,
      fieldsDto: dto.fields,
      pagesDto: dto.pages,
      propsDto: dto.props,
      redirectsDto: dto.redirects,
      resourcesDto: dto.resources,
      storesDto: dto.stores,
      tagsDto: dto.tags,
      typesDto: dto.types,
    })
  }, [dto, hydrate])

  return <>{children}</>
}
