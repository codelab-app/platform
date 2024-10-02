import type { IFieldDomainService } from '@codelab/frontend/abstract/domain'
import type { IFieldDto, ITypeMaybeRef } from '@codelab/shared/abstract/core'

import { chance } from '@codelab/frontend-domain-shared'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const fieldFactory =
  (fieldDomainService: IFieldDomainService) => (dto: Partial<IFieldDto>) => {
    const field: IFieldDto = {
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
      nextSibling: dto.nextSibling ?? null,
      prevSibling: dto.prevSibling ?? null,
      validationRules: dto.validationRules ?? null,
    }

    return fieldDomainService.hydrate(field)
  }
