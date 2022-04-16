import { IResource } from './resource.interface'

export interface AbstractOperation<C> {
  id: string
  name: string
  resource: IResource
  config: C
}
