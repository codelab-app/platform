'use client'

import type { IComponentBuilderDto } from '@codelab/frontend/abstract/domain'

import { useDomainStoreHydrator } from '@codelab/frontend/infra/context'
import { observer } from 'mobx-react-lite'
import { type ReactNode, useEffect } from 'react'

/**
 * Client layout used for hydration and setting provider context
 */
export const LayoutClient = observer(
  ({
    children,
    componentId,
    dto,
  }: {
    children: ReactNode
    componentId: string
    dto: IComponentBuilderDto
  }) => {
    const hydrate = useDomainStoreHydrator()

    useEffect(() => {
      hydrate({
        actionsDto: dto.actions,
        atomsDto: dto.atoms,
        componentsDto: dto.components,
        elementsDto: dto.elements,
        fieldsDto: dto.fields,
        propsDto: dto.props,
        resourcesDto: dto.resources,
        storesDto: dto.stores,
        tagsDto: dto.tags,
        typesDto: dto.types,
      })
    }, [dto, hydrate])

    return <>{children}</>
  },
)
