import type { IUserDto } from '@codelab/shared/abstract/core'

export interface IMapper<Dto, CreateInput, UpdateInput> {
  owner: IUserDto
  toCreateInput(dto: Dto): CreateInput
  toUpdateInput(dto: Dto): UpdateInput
}
