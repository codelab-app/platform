import type { ITypeDto } from '@codelab/shared/abstract/core'

import {
  type IInterfaceTypeModel,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { systemTypesData } from '@codelab/shared/data/seed'
import { guestUser } from '@codelab/shared/data/test'
import React from 'react'
import { v4 } from 'uuid'

import { InterfaceForm } from './InterfaceForm'

export default {
  component: InterfaceForm,
  title: 'InterfaceForm',
}

const DefaultInterfaceForm = () => {
  const { typeDomainService } = useDomainStore()
  const model = {}

  const onSubmit = (data: unknown) => {
    console.log(data)

    return Promise.resolve()
  }

  const interfaceType: IInterfaceTypeModel = new InterfaceType({
    kind: ITypeKind.InterfaceType,
    name: 'Test',
    owner: userRef(v4()),
  })

  const systemTypes = systemTypesData(guestUser)
  const typesDto: Array<ITypeDto> = []

  return (
    <DomainStoreHydrator typesDto={typesDto}>
      <InterfaceForm
        interfaceType={interfaceType}
        model={model}
        onSubmit={onSubmit}
      />
    </DomainStoreHydrator>
  )
}

export const Default = {
  render: () => <DefaultInterfaceForm />,
}
