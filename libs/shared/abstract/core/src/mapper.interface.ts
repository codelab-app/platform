export interface IMapper<CreateDto, CreateInput, UpdateInput, DeleteInput> {
  toCreateInput(dto: CreateDto): CreateInput
  toDeleteInput(args?: unknown): DeleteInput
  toUpdateInput(dto: CreateDto): UpdateInput
}
