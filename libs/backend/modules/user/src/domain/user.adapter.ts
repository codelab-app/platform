import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphUser } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { User } from './user.model'

@Injectable()
export class UserAdapter extends BaseAdapter<DgraphUser, User> {
  mapItem({ uid, auth0Id, roles }: DgraphUser) {
    return new User({ id: uid, auth0Id, roles })
  }
}
