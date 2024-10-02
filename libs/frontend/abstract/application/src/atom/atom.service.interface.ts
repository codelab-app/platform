import type {
  IAtomModel,
  ICreateAtomData,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import type { IPopover, SelectOption } from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gql'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import type { ICRUDService, IPaginateable, IQueryService } from '../services'

export interface IAtomService
  extends ICRUDService<IAtomModel, ICreateAtomData, IUpdateAtomData>,
    IQueryService<IAtomModel, AtomWhere, AtomOptions>,
    IPaginateable<IAtomModel> {
  atomPopoverCreate: IPopover
  atomPopoverUpdate: IPopover
  getSelectAtomOptions(
    parent: IAtomModel | undefined,
  ): Promise<Array<SelectOption>>
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
