import type {
  IAtomModel,
  ICreateAtomData,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import type { IPopover, SelectOption } from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gql'

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
  goToAtomsPage(): void
  goToDeleteAtomPage(ref: IRef): void
  loadApi(atomId: string): Promise<void>
}
