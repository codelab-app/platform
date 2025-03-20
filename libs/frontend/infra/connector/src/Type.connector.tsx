'use client'

import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'
import { observer } from 'mobx-react-lite'

export const TypeConnector = observer(
  ({ children, id }: { id: string; children(type: ITypeModel): ReactNode }) => {
    const { typeDomainService } = useDomainStore()
    const type = typeDomainService.types.get(id)

    if (!type) {
      return <Spinner />
    }

    return <>{children(type)}</>
  },
)
