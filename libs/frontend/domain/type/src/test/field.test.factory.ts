import type { IRootStore } from '@codelab/frontend/abstract/application'
import { chance } from '@codelab/frontend/domain/shared'
import type {
  IFieldDTO,
  IRef,
  ITypeMaybeRef,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { DeepPartial } from 'fishery'
import { Factory } from 'fishery'
import type { _DeepPartialObject } from 'utility-types/dist/mapped-types'
import { v4 } from 'uuid'

export const FieldTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IFieldDTO>(({ params }) => {
    const dto: IFieldDTO = {
      api: { id: params.api?.id ?? v4() },
      defaultValues: params.defaultValues ?? null,
      description: params.description ?? null,
      fieldType: (params.fieldType ?? {
        __typename: ITypeKind.PrimitiveType,
        id: v4(),
      }) as ITypeMaybeRef,
      id: params.id ?? v4(),
      key: params.key ?? chance.word(),
      name: params.name ?? null,
      nextSibling: (params.nextSibling ?? null) as IRef | null,
      prevSibling: (params.prevSibling ?? null) as IRef | null,
      validationRules: params.validationRules ?? null,
    }

    rootStore.fieldService?.hydrate(dto)

    return dto
  })
