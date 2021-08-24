import { UseCasePort } from '@codelab/backend/abstract/core'

export class ImportAtomsService implements UseCasePort<any, any> {
  execute(request: any): Promise<any> {
    return Promise.resolve(undefined)
  }
}
