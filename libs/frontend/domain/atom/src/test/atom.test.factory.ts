import type { IRootStore } from '@codelab/frontend/abstract/application'
import { chance } from '@codelab/frontend/domain/shared'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const AtomTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IAtomDTO>(({ params }) => {
    const dto: IAtomDTO = {
      __typename: `${IElementRenderTypeKind.Atom}`,
      api: { id: params.api?.id ?? v4() },
      externalCssSource: params.externalCssSource ?? null,
      externalJsSource: params.externalJsSource ?? null,
      externalSourceType: params.externalSourceType ?? null,
      icon: params.icon ?? null,
      id: params.id ?? v4(),
      name: params.name ?? chance.word({ capitalize: true }),
      requiredParents: params.requiredParents ?? [],
      suggestedChildren: params.suggestedChildren ?? [],
      tags: params.tags ?? [],
      type: params.type ?? IAtomType.ReactFragment,
    }

    rootStore.atomService?.atomDomainService.hydrate(dto)

    return dto
  })
