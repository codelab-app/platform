import type { ICreateTypeData } from '@codelab/frontend/abstract/domain'
import { InterfaceType } from '@codelab/frontend/domain/type'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { createTestRootStore } from '../setup/test-root-store'
import chance from './chance'

export default Factory.define<ICreateTypeData>(({ params }) => {
  const dto = {
    id: params.id ?? v4(),
    kind: ITypeKind.InterfaceType,
    name:
      params.name ??
      InterfaceType.createName(chance.word({ capitalize: true })),
  }

  createTestRootStore().typeService.typeDomainService.addInterface(dto)

  return dto
})
