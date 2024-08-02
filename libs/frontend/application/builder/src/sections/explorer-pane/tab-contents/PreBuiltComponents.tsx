import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ComponentList } from './ComponentList'

export const PreBuiltComponents = observer(() => {
  const { atomDomainService } = useDomainStore()

  return <ComponentList components={atomDomainService.atomsList} />
})
