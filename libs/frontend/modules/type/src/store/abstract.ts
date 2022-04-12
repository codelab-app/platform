import { IAnyType, ITypeDTO } from '@codelab/shared/abstract/core'

export const baseUpdateFromFragment = function (
  self: IAnyType,
  type: ITypeDTO,
) {
  self.name = type.name
  self.ownerAuth0Id = type.owner.auth0Id
}
