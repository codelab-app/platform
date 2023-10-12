import type { IFieldDTO, ITypeEntity } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { rootStore as testRootStore } from '../setup'
import chance from './chance'

export default Factory.define<IFieldDTO>(({ params }) => {
  const dto: IFieldDTO = {
    api: { id: params.api?.id ?? v4() },
    defaultValues: params.defaultValues ?? null,
    description: params.description ?? null,
    fieldType: (params.fieldType ?? {
      __typename: ITypeKind.PrimitiveType,
      id: v4(),
    }) as ITypeEntity,
    id: params.id ?? v4(),
    key: params.key ?? chance.word(),
    name: params.name ?? null,
    nextSibling: (params.nextSibling ?? null) as IEntity | null,
    prevSibling: (params.prevSibling ?? null) as IEntity | null,
    validationRules: params.validationRules ?? null,
  }

  testRootStore.fieldService.add(dto)

  return dto
})
