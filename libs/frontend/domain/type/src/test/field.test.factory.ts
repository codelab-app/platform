import type { IFieldDomainService } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type {
  IFieldDTO,
  IRef,
  ITypeMaybeRef,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const fieldFactory =
  (fieldDomainService: IFieldDomainService) => (dto: Partial<IFieldDTO>) => {
    const field: IFieldDTO = {
      api: { id: dto.api?.id ?? v4() },
      defaultValues: dto.defaultValues ?? null,
      description: dto.description ?? null,
      fieldType: (dto.fieldType ?? {
        __typename: ITypeKind.PrimitiveType,
        id: v4(),
      }) as ITypeMaybeRef,
      id: dto.id ?? v4(),
      key: dto.key ?? chance.word(),
      name: dto.name ?? null,
      nextSibling: (dto.nextSibling ?? null) as IRef | null,
      prevSibling: (dto.prevSibling ?? null) as IRef | null,
      validationRules: dto.validationRules ?? null,
    }

    return fieldDomainService.hydrate(field)
  }
