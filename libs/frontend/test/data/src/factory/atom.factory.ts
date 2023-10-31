import type { IAtomDTO } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import chance from './chance'

export default Factory.define<IAtomDTO>(({ params }) => {
  const dto: IAtomDTO = {
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

  return dto
})
