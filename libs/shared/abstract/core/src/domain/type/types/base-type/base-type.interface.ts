import { ITypeKind } from './type-kind.enum'

export interface IBaseType {
  id: string
  name: string
  kind: ITypeKind
  ownerId: string
  // owner: Ref<IUser>
  // makeCreateInput(id: string): ICreateTypeInput
  // makeUpdateInput(): IUpdateTypeArgs
  // updateCache(fragment: any): void
  // applyUpdateData(data: any): void
}
