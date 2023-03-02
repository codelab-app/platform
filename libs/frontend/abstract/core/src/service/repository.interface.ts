export interface IBaseRepository<Model, ModelDTO, Where> {
  get(where: Where): Promise<Array<ModelDTO>>
  create(resource: Model): Promise<ModelDTO>
  update(resource: Model): Promise<ModelDTO>
  delete(id: string): Promise<number>
}
