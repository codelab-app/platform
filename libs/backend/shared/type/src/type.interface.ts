export interface ITypeService {
  find(where: { id_IN: Array<string> }): Promise<Array<any>>
}

export interface ITypeRepository {
  find(where: { id_IN: Array<string> }): Promise<Array<any>>
}
