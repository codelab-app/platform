export interface IMapper<CreateDto, CreateInput, UpdateInput, DeleteInput> {
  toCreateInput(dto: CreateDto, ...args: Array<unknown>): CreateInput
  toDeleteInput(args?: unknown): DeleteInput
  toUpdateInput(dto: CreateDto): UpdateInput
}
