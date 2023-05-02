import type { IVercelService } from '@codelab/frontend/abstract/core'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'

@model('@codelab/VercelService')
export class VercelService extends Model({}) implements IVercelService {
  @modelFlow
  create = _async(function* (this: VercelService, name: string) {
    return yield* _await(
      fetch(`/api/vercel/domains`, {
        body: JSON.stringify({ apiVersion: 10, name }),
        method: 'POST',
      }),
    )
  })

  @modelFlow
  update = _async(function* (
    this: VercelService,
    oldName: string,
    newName: string,
  ) {
    yield* _await(this.delete(oldName))
    yield* _await(this.create(newName))
  })

  @modelFlow
  delete = _async(function* (this: VercelService, name: string) {
    return yield* _await(
      fetch(`/api/vercel/domains/${name}`, {
        method: 'DELETE',
      }),
    )
  })
}
