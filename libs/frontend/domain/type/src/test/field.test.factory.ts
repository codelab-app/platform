import type {
  IFieldModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type {
  IFieldDTO,
  IRef,
  ITypeMaybeRef,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const FieldTestFactory = (rootStore: Partial<IRootDomainStore>) =>
  Factory.define<IFieldModel, IFieldDTO>(({ transientParams }) => {
    const dto: IFieldDTO = {
      api: { id: transientParams.api?.id ?? v4() },
      defaultValues: transientParams.defaultValues ?? null,
      description: transientParams.description ?? null,
      fieldType: (transientParams.fieldType ?? {
        __typename: ITypeKind.PrimitiveType,
        id: v4(),
      }) as ITypeMaybeRef,
      id: transientParams.id ?? v4(),
      key: transientParams.key ?? chance.word(),
      name: transientParams.name ?? null,
      nextSibling: (transientParams.nextSibling ?? null) as IRef | null,
      prevSibling: (transientParams.prevSibling ?? null) as IRef | null,
      validationRules: transientParams.validationRules ?? null,
    }

    const model = rootStore.fieldDomainService?.hydrate(dto)

    return model!
  })
