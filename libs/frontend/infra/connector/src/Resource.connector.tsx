'use client'

import type { IResourceModel } from '@codelab/frontend-abstract-domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'
import { observer } from 'mobx-react-lite'

export const ResourceConnector = observer(
  ({
    children,
    id,
  }: {
    id: string
    children(resource: IResourceModel): ReactNode
  }) => {
    const { resourceDomainService } = useDomainStore()
    const resource = resourceDomainService.resources.get(id)

    if (!resource) {
      return <Spinner />
    }

    return <>{children(resource)}</>
  },
)
