import { IAtomType } from '@codelab/shared/abstract/core'
import { HtmlTag } from '@codelab/shared/data/seed'
import type { AtomSeedData } from '../atom-seed-data.interface'

export const htmlAtomData: Partial<Record<IAtomType, AtomSeedData>> = {
  [IAtomType.HtmlA]: {
    file: null,
    icon: null,
    tag: HtmlTag.Html,
  },
}
