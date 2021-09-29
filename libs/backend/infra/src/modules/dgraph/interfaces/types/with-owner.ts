import { DgraphUser } from '../dgraph-user'

export interface WithOwnerId {
  ownerId: string
}

export interface WithOwner {
  owner?: DgraphUser
}
