import type {
  IAuthGuardModel,
  IEntityFormService,
} from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AuthGuardFormService')
export class AuthGuardFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IAuthGuardModel>>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<
      Ref<IAuthGuardModel>,
      { authguard: Maybe<IAuthGuardModel> }
    >
{
  @computed
  get authguard() {
    return this.metadata?.current
  }
}
