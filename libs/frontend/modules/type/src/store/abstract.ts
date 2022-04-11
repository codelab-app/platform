import { TypeFragment } from '../graphql'
import { AnyType } from './models'

export const baseUpdateFromFragment = function (
  self: AnyType,
  type: TypeFragment,
) {
  self.name = type.name
  self.ownerAuth0Id = type.owner.auth0Id
}
