import { ICreateTypeInput, IUpdateTypeArgs } from '../../type.input.interface'
import type { TypeKind } from './type-kind.enum'

export interface IBaseType {
  id: string
  name: string
  typeKind: TypeKind
  ownerAuth0Id: string
  makeCreateInput(id: string): ICreateTypeInput
  makeUpdateInput(): IUpdateTypeArgs
  updateFromFragment(fragment: any): void
  applyUpdateData(data: any): void
}
