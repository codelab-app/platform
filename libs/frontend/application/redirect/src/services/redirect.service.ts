import type { IRedirectService } from '@codelab/frontend/abstract/application'
import type {
  ICreateRedirectData,
  IRedirectModel,
  IUpdateRedirectData,
} from '@codelab/frontend/abstract/domain'
import { RedirectDomainService } from '@codelab/frontend/domain/redirect'
import type { RedirectWhere } from '@codelab/shared/abstract/codegen'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { RedirectRepository } from './redirect.repo'
import {
  CreateRedirectFormService,
  RedirectFormService,
} from './redirect-form.service'

@model('@codelab/RedirectService')
export class RedirectService
  extends Model({
    createForm: prop(() => new CreateRedirectFormService({})),
    deleteModal: prop(() => new RedirectFormService({})),
    redirectDomainService: prop(() => new RedirectDomainService({})),
    redirectRepository: prop(() => new RedirectRepository({})),
    updateForm: prop(() => new RedirectFormService({})),
  })
  implements IRedirectService
{
  @computed
  get redirectList() {
    return [...this.redirectDomainService.redirects.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: RedirectService,
    redirectDto: ICreateRedirectData,
  ) {
    const redirect = this.redirectDomainService.hydrate(redirectDto)

    yield* _await(this.redirectRepository.add(redirect))

    return redirect
  })

  @modelFlow
  @transaction
  delete = _async(function* (
    this: RedirectService,
    redirectsModel: Array<IRedirectModel>,
  ) {
    redirectsModel.forEach((redirect) =>
      this.redirectDomainService.redirects.delete(redirect.id),
    )

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

    return redirects.map((redirect) =>
      this.redirectDomainService.hydrate(redirect),
    )
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
    const redirect = this.redirectDomainService.redirects.get(redirectDTO.id)!

    redirect.writeCache(redirectDTO)

    yield* _await(this.redirectRepository.update(redirect))

    return redirect!
  })

  redirect(id: string) {
    return this.redirectDomainService.redirects.get(id)
  }
}
