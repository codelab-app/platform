export interface IVercelService {
  create(name: string): Promise<unknown>
  delete(name: string): Promise<unknown>
  update(name: string): Promise<unknown>
}
