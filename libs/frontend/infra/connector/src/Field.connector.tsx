'use client'

import type { IFieldModel } from '@codelab/frontend-abstract-domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'
import { observer } from 'mobx-react-lite'

export const FieldConnector = observer(
  ({
    children,
    id,
  }: {
    id: string
    children(field: IFieldModel): ReactNode
  }) => {
    const { fieldDomainService } = useDomainStore()
    const field = fieldDomainService.fields.get(id)

    if (!field) {
      return <Spinner />
    }

    return <>{children(field)}</>
  },
)
