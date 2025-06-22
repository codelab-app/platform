import type {
  IRedirect,
  IRedirectDto,
  IRedirectTargetType,
  IRef,
} from '@codelab/shared-abstract-core'
import type { Nullable } from '@codelab/shared-abstract-types'

import { IModel } from '@codelab/shared-abstract-core'

export class Redirect extends IModel implements IRedirect {
  authGuard: IRef

  id: string

  source: IRef

  targetPage?: Nullable<IRef>

  targetType: IRedirectTargetType

  targetUrl?: Nullable<string>

  constructor({
    authGuard,
    id,
    source,
    targetPage,
    targetType,
    targetUrl,
  }: IRedirectDto) {
    super()

    this.id = id
    this.authGuard = authGuard
    this.source = source
    this.targetType = targetType
    this.targetPage = targetPage
    this.targetUrl = targetUrl
  }
}
