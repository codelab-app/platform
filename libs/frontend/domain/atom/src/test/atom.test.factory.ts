import type { IAtomDomainService } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const atomFactory =
  (atomDomainService: IAtomDomainService) => (dto: Partial<IAtomDto>) => {
    const atom: IAtomDto = {
      __typename: `${IElementRenderTypeKind.Atom}`,
      api: { id: dto.api?.id ?? v4() },
      externalCssSource: dto.externalCssSource ?? null,
      externalJsSource: dto.externalJsSource ?? null,
      externalSourceType: dto.externalSourceType ?? null,
      icon: dto.icon ?? null,
      id: dto.id ?? v4(),
      name: dto.name ?? chance.word({ capitalize: true }),
      requiredParents: dto.requiredParents ?? [],
      suggestedChildren: dto.suggestedChildren ?? [],
      tags: dto.tags ?? [],
      type: dto.type ?? IAtomType.ReactFragment,
    }

    return atomDomainService.hydrate(atom)
  }
