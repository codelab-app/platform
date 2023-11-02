import type {
  IAtomModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import { chance, ModelFactory } from '@codelab/frontend/domain/shared'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const AtomTestFactory = (rootStore: Partial<IRootDomainStore>) =>
  Factory.define<IAtomModel, IAtomDTO>(({ transientParams }) => {
    const dto: IAtomDTO = {
      // __typename: `${IElementRenderTypeKind.Atom}`,
      api: { id: transientParams.api?.id ?? v4() },
      externalCssSource: transientParams.externalCssSource ?? null,
      externalJsSource: transientParams.externalJsSource ?? null,
      externalSourceType: transientParams.externalSourceType ?? null,
      icon: transientParams.icon ?? null,
      id: transientParams.id ?? v4(),
      name: transientParams.name ?? chance.word({ capitalize: true }),
      requiredParents: transientParams.requiredParents ?? [],
      suggestedChildren: transientParams.suggestedChildren ?? [],
      tags: transientParams.tags ?? [],
      type: transientParams.type ?? IAtomType.ReactFragment,
    }

    const model = rootStore.atomDomainService?.hydrate(dto)

    return model!
  })

export const atomFactory =
  (rootStore: IRootDomainStore) => (dto: Partial<IAtomDTO>) => {
    const atom: IAtomDTO = {
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

    return rootStore.atomDomainService.hydrate(atom)
  }
