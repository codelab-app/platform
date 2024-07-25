import type {
  IAtomModel,
  ICreateAtomData,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import type { DefaultOptionType } from 'antd/lib/select'
import type { GuaranteedProps } from 'uniforms'
import type { ICRUDService, IPaginateable, IQueryService } from '../services'

export interface IAtomService
  extends ICRUDService<IAtomModel, ICreateAtomData, IUpdateAtomData>,
    IQueryService<IAtomModel, AtomWhere, AtomOptions>,
    IPaginateable<IAtomModel, { name?: string }> {
  getSelectAtomOptions(
    fieldProps: GuaranteedProps<string | undefined>,
    parent: IAtomModel | undefined,
  ): Promise<Array<DefaultOptionType>>
  loadApi(atomId: string): Promise<void>
}
