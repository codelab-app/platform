import type {
  IAtomModel,
  ICreateAtomData,
  IUpdateAtomData,
} from '@codelab/frontend-abstract-domain'
import type { IPopover } from '@codelab/frontend-abstract-types'
import type { IRef } from '@codelab/shared-abstract-core'
import type { AtomOptions, AtomWhere } from '@codelab/shared-infra-gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import type { ICrudService, IQueryService } from '../services'
import type { IAtomCreateRoute, IAtomUpdateRoute } from './atom.route.interface'

export interface IAtomService
  extends ICrudService<IRef, ICreateAtomData, IUpdateAtomData>,
    IQueryService<IAtomModel, AtomWhere, AtomOptions> {
  createPopover: IPopover<IAtomCreateRoute, IAtomCreateRoute>
  updatePopover: IPopover<IAtomUpdateRoute, IAtomUpdateRoute>
  /**
   * Decouples router from services
   */
  goToAtomsPage(router: AppRouterInstance): void
  /**
   * Decouples router from services
   */
  goToDeleteAtomPage(ref: IRef, router: AppRouterInstance): void
  loadApi(atomId: string): Promise<void>
}
