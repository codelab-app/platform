import type { IUserDto } from '@codelab/shared/abstract/core'

export interface IMapper<CreateDto, CreateInput, UpdateInput, DeleteInput> {
  owner: IUserDto
  toCreateInput(dto: CreateDto, ...args: Array<unknown>): CreateInput
  toDeleteInput(): DeleteInput
  toUpdateInput(dto: CreateDto): UpdateInput
}
