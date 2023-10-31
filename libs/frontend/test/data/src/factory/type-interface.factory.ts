import type { ICreateTypeData } from '@codelab/frontend/abstract/domain'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import chance from './chance'

export default Factory.define<ICreateTypeData>(({ params }) => {
  const dto = {
    id: params.id ?? v4(),
    kind: ITypeKind.InterfaceType,
    name: params.name ?? `${chance.word({ capitalize: true })} API`,
  }

  return dto
})