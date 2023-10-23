import type { IBaseRedirect } from '@codelab/frontend/abstract/domain'
import type { IRedirectKind } from '@codelab/shared/abstract/core'
import { idProp, Model, prop } from 'mobx-keystone'

export const createBaseRedirect = <T extends IRedirectKind>(type: T) =>
  class
    extends Model({
      id: idProp,
      kind: prop<T>(() => type),
    })
    implements IBaseRedirect {}
