import type { ITypeDomainService } from '@codelab/frontend/abstract/domain'
import type { IRichTextTypeDto } from '@codelab/shared/abstract/core'

import { TypeKind } from '@codelab/shared/infra/gqlgen'
import { v4 } from 'uuid'

export const richTextTypeFactory =
  (typeDomainService: ITypeDomainService) =>
  (dto: Partial<IRichTextTypeDto>) => {
    const richTextType: IRichTextTypeDto = {
      __typename: TypeKind.RichTextType as const,
      id: dto.id ?? v4(),
      kind: TypeKind.RichTextType,
      name: dto.name ?? 'richTextType',
      owner: { id: v4() },
    }

    return typeDomainService.hydrate(richTextType)
  }
