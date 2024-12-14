import type {
  RedirectCreateInput,
  RedirectDeleteInput,
  RedirectUpdateInput,
} from '@codelab/shared/infra/gql'

import {
  type IMapper,
  type IRedirectDto,
  IRedirectTargetType,
} from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  disconnectAll,
  reconnectNodeId,
} from '@codelab/shared/domain/orm'

export const redirectMapper: IMapper<
  IRedirectDto,
  RedirectCreateInput,
  RedirectUpdateInput,
  RedirectDeleteInput
> = {
  toCreateInput: ({
    authGuard,
    id,
    source,
    targetPage,
    targetType,
    targetUrl,
  }: IRedirectDto): RedirectCreateInput => {
    return {
      authGuard: connectNodeId(authGuard.id),
      id: id,
      source: connectNodeId(source.id),
      targetPage:
        targetType === IRedirectTargetType.Page
          ? connectNodeId(targetPage?.id)
          : undefined,
      targetType,
      targetUrl: targetType === IRedirectTargetType.Url ? targetUrl : undefined,
    }
  },

  toDeleteInput: (): RedirectDeleteInput => {
    return {}
  },

  toUpdateInput: ({
    authGuard,
    source,
    targetPage,
    targetType,
    targetUrl,
  }: IRedirectDto): RedirectUpdateInput => {
    return {
      authGuard: reconnectNodeId(authGuard.id),
      source: reconnectNodeId(source.id),
      targetPage:
        targetType === IRedirectTargetType.Page
          ? reconnectNodeId(targetPage?.id)
          : disconnectAll(),
      targetType,
      targetUrl: targetType === IRedirectTargetType.Url ? targetUrl : undefined,
    }
  },
}
