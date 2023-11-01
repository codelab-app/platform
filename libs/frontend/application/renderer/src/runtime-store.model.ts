import type {
  IRuntimeAction,
  IRuntimeStore,
} from '@codelab/frontend/abstract/application'
import {
  getRendererService,
  getRunnerId,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IApiActionModel,
  IBaseResourceConfigData,
  ICodeActionModel,
  IElementModel,
  IGraphQLActionConfig,
  IRestActionConfig,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  actionRef,
  elementRef,
  IPropModel,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import type { IPropData } from '@codelab/shared/abstract/core'
import { IActionKind, IResourceType } from '@codelab/shared/abstract/core'
import { throwIfUndefined } from '@codelab/shared/utils'
import { runtime } from '@ts-morph/common'
import type { Axios, Method } from 'axios'
import axios from 'axios'
import type { GraphQLClient } from 'graphql-request'
import isNil from 'lodash/isNil'
import isString from 'lodash/isString'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { RuntimeAction } from './runtime-action.model'
import { getRunner, tryParse } from './utils'

const create = (store: IStoreModel) =>
  new RuntimeStore({
    runtimeActions: store.actions.map((action) =>
      RuntimeAction.create(action.current, store),
    ),
    storeRef: storeRef(store.id),
  })

@model('@codelab/RuntimeStore')
export class RuntimeStore
  extends Model(() => ({
    runtimeActions: prop<Array<IRuntimeAction>>(() => []),
    storeRef: prop<Ref<IStoreModel>>(),
  }))
  implements IRuntimeStore
{
  static create = create

  @computed
  get store() {
    return this.storeRef.current
  }

  @computed
  get renderer() {
    const renderService = getRendererService(this)

    return renderService.activeRenderer?.current
  }

  runtimeAction(action: IActionModel) {
    return throwIfUndefined(
      this.runtimeActions.find(
        (runtimeAction) => runtimeAction.id === action.id,
      ),
    )
  }
}
