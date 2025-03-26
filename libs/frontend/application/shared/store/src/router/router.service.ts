import type { IRouterService } from '@codelab/frontend/abstract/application'
import type { SearchParamsProps } from '@codelab/frontend/abstract/types'

import { ObjectLike } from '@codelab/shared/abstract/types'
import { Validator } from '@codelab/shared/infra/typebox'
import { computed } from 'mobx'
import { Model, model, prop } from 'mobx-keystone'

/**
 * Cannot init searchParams in root store, since layout does not have access to search params. We use a separate component to hydrate the search params within page.
 *
 * Used by builder by setting searchParams with unknown object
 */
@model('@codelab/RouterService')
export class RouterService
  extends Model({
    searchParams: prop<ObjectLike>(() => ({})).withSetter(),
  })
  implements IRouterService {}
