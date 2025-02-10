'use client'

import type {
  IAppBuilderDto,
  IComponentBuilderDto,
} from '@codelab/frontend/abstract/domain'

import { RendererType } from '@codelab/frontend/abstract/application'
import {
  ApplicationStoreHydrator,
  DomainStoreHydrator,
  useDomainStoreHydrator,
} from '@codelab/frontend/infra/context'
import { BuilderProvider } from '@codelab/frontend/presentation/container'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
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
    const { componentDomainService } = useDomainStore()

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

    return <> {children}</>
  },
)
