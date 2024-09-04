import type {
  IAtomModel,
  ICreateAtomData,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gql'
import type { GuaranteedProps } from 'uniforms'
import type {
  ICRUDService,
  IPaginateable,
  IQueryService,
  NameFilter,
} from '../services'

export interface IAtomService
  extends ICRUDService<IAtomModel, ICreateAtomData, IUpdateAtomData>,
    IQueryService<IAtomModel, AtomWhere, AtomOptions>,
    IPaginateable<IAtomModel, NameFilter> {
  getSelectAtomOptions(
    fieldProps: GuaranteedProps<string | undefined>,
    parent: IAtomModel | undefined,
  ): Promise<Array<SelectOption>>
  loadApi(atomId: string): Promise<void>
}
