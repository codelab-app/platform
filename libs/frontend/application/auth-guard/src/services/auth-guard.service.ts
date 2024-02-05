import type { IAuthGuardService } from '@codelab/frontend/abstract/application'
import { getResourceService } from '@codelab/frontend/abstract/application'
import type {
  IAuthGuardModel,
  ICreateAuthGuardData,
  IUpdateAuthGuardData,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/application/prop'
import { AuthGuardModel } from '@codelab/frontend/domain/auth-guard'
import {
  InlineFormService,
  ModalService,
} from '@codelab/frontend/domain/shared'
import type { AuthGuardWhere } from '@codelab/shared/abstract/codegen'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { AuthGuardRepository } from './auth-guard.repo'
import { AuthGuardFormService } from './auth-guard-form.service'
import { AuthGuardModalService } from './auth-guard-modal.service'

@model('@codelab/AuthGuardService')
export class AuthGuardService
  extends Model({
    authGuardRepository: prop(() => new AuthGuardRepository({})),
    authGuards: prop(() => objectMap<IAuthGuardModel>()),
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new AuthGuardModalService({})),
    updateForm: prop(() => new AuthGuardFormService({})),
    updateModal: prop(() => new AuthGuardModalService({})),
  })
  implements IAuthGuardService
{
  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  private get resourceService() {
    return getResourceService(this)
  }

  @computed
  get authGuardList() {
    return [...this.authGuards.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: AuthGuardService,
    data: ICreateAuthGuardData,
  ) {
    const { config } = data

    const configDto: IPropDTO = {
      data: JSON.stringify(config.data),
      id: v4(),
    }

    const authGuard = this.add({
      ...data,
      config: configDto,
    })

    yield* _await(this.authGuardRepository.add(authGuard))

    return authGuard
  })

  @modelFlow
  @transaction
  delete = _async(function* (
    this: AuthGuardService,
    authGuards: Array<IAuthGuardModel>,
  ) {
    for (const authGuard of authGuards) {
      this.authGuards.delete(authGuard.id)
    }

    yield* _await(this.authGuardRepository.delete(authGuards))

    return
  })

  @modelFlow
  @transaction
  getAll = _async(function* (
    this: AuthGuardService,
    where: AuthGuardWhere = {},
  ) {
    const { items: authGuards } = yield* _await(
      this.authGuardRepository.find(where),
    )

    return authGuards.map((authGuard) => {
      this.resourceService.load([authGuard.resource])

      return this.add(authGuard)
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AuthGuardService, id: string) {
    const [authGuard] = yield* _await(this.getAll({ id }))

    return authGuard
  })

  @modelFlow
  getSelectAuthGuardOptions = _async(function* (this: AuthGuardService) {
    const authGuards = yield* _await(this.getAll())

    return authGuards.map((authGuard) => ({
      label: authGuard.name,
      value: authGuard.id,
    }))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: AuthGuardService,
    {
      config: configData,
      id,
      name,
      resource,
      responseTransformer,
    }: IUpdateAuthGuardData,
  ) {
    const authGuard = this.authGuards.get(id)!
    const config = authGuard.config

    config.writeCache({ data: JSON.stringify(configData.data) })

    authGuard.writeCache({ name, resource, responseTransformer })

    yield* _await(this.authGuardRepository.update(authGuard))

    return authGuard
  })

  @modelAction
  add(authGuardDTO: IAuthGuardDTO) {
    const authGuard = AuthGuardModel.create(authGuardDTO)

    this.authGuards.set(authGuard.id, authGuard)

    return authGuard
  }

  authGuard(id: string) {
    return this.authGuards.get(id)
  }
}
