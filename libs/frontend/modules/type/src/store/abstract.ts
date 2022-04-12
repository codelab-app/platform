import { IAnyType } from '@codelab/shared/abstract/core'
import { TypeFragment } from '../graphql'

export const baseUpdateFromFragment = function (
  self: IAnyType,
  type: TypeFragment,
) {
  self.name = type.name
  self.ownerAuth0Id = type.owner.auth0Id
}
