import type { IVercelService } from '@codelab/frontend/abstract/core'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { projectApiUrl, teamIdParam } from '../config'

@model('@codelab/VercelService')
export class VercelService extends Model({}) implements IVercelService {
  @modelFlow
  create = _async(function* (this: VercelService, name: string) {
    return yield* _await(
      fetch(`/api/vercel/${projectApiUrl('10')}/domains?${teamIdParam}`, {
        body: JSON.stringify({ name }),
        method: 'POST',
      }),
    )
  })

  @modelFlow
  update = _async(function* (this: VercelService, name: string) {
    return yield* _await(
      fetch(`/api/vercel/${projectApiUrl()}/domains?${teamIdParam}`, {
        body: JSON.stringify({ name }),
        method: 'PATCH',
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
