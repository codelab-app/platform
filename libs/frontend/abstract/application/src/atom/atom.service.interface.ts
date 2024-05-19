import type {
  IAtomModel,
  ICreateAtomData,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gql'
import type { ICRUDService, IPaginateable, IQueryService } from '../services'

export interface IAtomService
  extends ICRUDService<IAtomModel, ICreateAtomData, IUpdateAtomData>,
    IQueryService<IAtomModel, AtomWhere, AtomOptions>,
    IPaginateable<IAtomModel, { name?: string }> {
  getSelectAtomOptions(
    parent: IAtomModel | undefined,
  ): Promise<Array<SelectOption>>
  loadApi(atomId: string): Promise<void>
}
