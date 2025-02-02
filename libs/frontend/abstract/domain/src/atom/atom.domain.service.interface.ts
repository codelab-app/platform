import type {
  RenderTypeSelectOption,
  SelectOption,
} from '@codelab/frontend/abstract/types'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import type { ArraySet, ObjectMap } from 'mobx-keystone'

import type { IComponentType } from '../renderer'
import type { IHydrateable } from '../shared'
import type { IAtomModel } from './atom.model.interface'

export interface IAtomDomainService extends IHydrateable<IAtomDto, IAtomModel> {
  atoms: ObjectMap<IAtomModel>
  atomsList: Array<IAtomModel>
  defaultRenderType: IAtomModel
  dynamicComponents: Record<string, IComponentType>
  loadedExternalCssSources: ArraySet<string>
  loadedExternalJsSources: ArraySet<string>

  getRenderTypeOptions(
    components?: Array<SelectOption>,
  ): Array<RenderTypeSelectOption>
}
