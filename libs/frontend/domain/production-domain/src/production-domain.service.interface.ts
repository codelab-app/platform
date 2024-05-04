export interface IProductionDomainService {
  create(name: string): Promise<unknown>
  delete(name: string): Promise<unknown>
  update(oldName: string, name: string): Promise<unknown>
}
