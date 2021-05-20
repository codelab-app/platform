import { Injectable } from '@nestjs/common'
import { GqlAuthGuard } from './gql-auth.guard'
import { isOwnerAddOn, StringExtractionFn } from './guard-addons'

export const IsOwnerAuthGuard = <TInput>(
  extractOwnerIdFromArgs: StringExtractionFn<TInput>,
) => {
  @Injectable()
  class _IsOwnerAuthGuard extends GqlAuthGuard {
    canActivate = isOwnerAddOn(extractOwnerIdFromArgs)
  }

  return _IsOwnerAuthGuard
}
