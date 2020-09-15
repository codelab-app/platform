export interface MongooseRepository {
  save<T>(data: T): Promise<T>
}

export interface CreateNodeDTO {
  type: string
  props?: object
  children?: Array<CreateNodeDTO>
}

export class NodeRepository implements MongooseRepository {
  save<CreateNodeDTO>(data: CreateNodeDTO): Promise<any> {
    return Promise.resolve('test')
  }
}
