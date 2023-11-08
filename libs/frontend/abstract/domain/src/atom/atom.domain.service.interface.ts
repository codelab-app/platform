import type { IAtom, IAtomDTO } from '@codelab/shared/abstract/core'
import type { ArraySet, ObjectMap } from 'mobx-keystone'
import type { IComponentType } from '../renderer'
import type { IHydrateable } from '../shared'
import type { IAtomModel } from './atom.model.interface'

export interface IAtomDomainService extends IHydrateable<IAtomDTO, IAtomModel> {
  atoms: ObjectMap<IAtomModel>
  atomsList: Array<IAtomModel>
  defaultRenderType: IAtom
  dynamicComponents: Record<string, IComponentType>
  loadedExternalCssSources: ArraySet<string>
  loadedExternalJsSources: ArraySet<string>
}
