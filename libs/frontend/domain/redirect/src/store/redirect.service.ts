import type {
  ICreateRedirectData,
  IRedirectModel,
  IUpdateRedirectData,
} from '@codelab/frontend/abstract/domain'
import type { RedirectWhere } from '@codelab/shared/abstract/codegen'
import type { IRedirectDTO } from '@codelab/shared/abstract/core'
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
import { Redirect } from './redirect.model'
import { RedirectRepository } from './redirect.repo'
import {
  CreateRedirectFormService,
  RedirectFormService,
} from './redirect-form.service'
import { IRedirectService } from '@codelab/frontend/abstract/application'

@model('@codelab/RedirectService')
export class RedirectService
  extends Model({
    createForm: prop(() => new CreateRedirectFormService({})),
    deleteModal: prop(() => new RedirectFormService({})),
    redirectRepository: prop(() => new RedirectRepository({})),
    redirects: prop(() => objectMap<IRedirectModel>()),
    updateForm: prop(() => new RedirectFormService({})),
  })
  implements IRedirectService
{
  @computed
  get redirectList() {
    return [...this.redirects.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: RedirectService,
    redirectDto: ICreateRedirectData,
  ) {
    const redirect = this.add(redirectDto)

    this.redirects.set(redirect.id, redirect)

    yield* _await(this.redirectRepository.add(redirect))

    return redirect
  })

  @modelFlow
  @transaction
  delete = _async(function* (
    this: RedirectService,
    redirectsModel: Array<IRedirectModel>,
  ) {
    redirectsModel.forEach((redirect) => this.redirects.delete(redirect.id))

    /**
     * Redirect can delete all other info
     */
    yield* _await(this.redirectRepository.delete(redirectsModel))
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: RedirectService, where: RedirectWhere) {
    const { items: redirects } = yield* _await(
      this.redirectRepository.find(where),
    )

    return redirects.map((redirect) => this.add(redirect))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: RedirectService, id: string) {
    const redirects = yield* _await(this.getAll({ id }))

    return redirects[0]
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: RedirectService,
    redirectDTO: IUpdateRedirectData,
  ) {
    const redirect = this.redirects.get(redirectDTO.id)!

    redirect.writeCache(redirectDTO)

    yield* _await(this.redirectRepository.update(redirect))

    return redirect!
  })

  @modelAction
  add = (redirectDTO: IRedirectDTO) => {
    console.debug('RedirectService.add()', redirectDTO)

    let redirect = this.redirects.get(redirectDTO.id)

    if (redirect) {
      redirect.writeCache(redirectDTO)
    } else {
      redirect = Redirect.create(redirectDTO)
      this.redirects.set(redirect.id, redirect)
    }

    return redirect
  }

  redirect(id: string) {
    return this.redirects.get(id)
  }
}
