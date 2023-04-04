import { Model, _async, _await, modelFlow, model } from 'mobx-keystone'
import { IVercelService } from '@codelab/frontend/abstract/core'
import { projectApiUrl, teamIdParam } from '../config'

@model('@codelab/VercelService')
export class VercelService extends Model({}) implements IVercelService {
  @modelFlow
  create = _async(function* (this: VercelService, name: string) {
    return yield* _await(
      fetch(`/api/vercel/${projectApiUrl}/domains?${teamIdParam}`, {
        method: 'POST',
        body: JSON.stringify({ name }),
      }),
    )
  })

  @modelFlow
  update = _async(function* (this: VercelService, name: string) {
    return yield* _await(
      fetch(`/api/vercel/${projectApiUrl()}/domains?${teamIdParam}`, {
        method: 'PATCH',
        body: JSON.stringify({ name }),
      }),
    )
  })

  @modelFlow
  delete = _async(function* (this: VercelService, name: string) {
    return yield* _await(
      fetch(`/api/vercel/${projectApiUrl()}/domains/${name}?${teamIdParam}`, {
        method: 'DELETE',
      }),
    )
  })
}
