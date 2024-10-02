import type { IRedirectService } from '@codelab/frontend/abstract/application'
import type {
  ICreateRedirectData,
  IRedirectModel,
  IUpdateRedirectData,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { RedirectWhere } from '@codelab/shared/infra/gql'

import { redirectRepository } from '@codelab/frontend-domain-redirect/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/schema'

export const useRedirectService = (): IRedirectService => {
  const { redirectDomainService } = useDomainStore()

  const create = async (redirectDto: ICreateRedirectData) => {
    const redirect = redirectDomainService.hydrate(redirectDto)

    await redirectRepository.add(redirect)

    return redirect
  }

  const removeMany = async (redirectsModel: Array<IRedirectModel>) => {
    redirectsModel.forEach((redirect) =>
      redirectDomainService.redirects.delete(redirect.id),
    )

    return await redirectRepository.delete(redirectsModel)
  }

  const getAll = async (where: RedirectWhere) => {
    const { items: redirects } = await redirectRepository.find(where)

    return redirects.map((redirect) => redirectDomainService.hydrate(redirect))
  }

  const getOne = async (id: string) => {
    const redirects = await getAll({ id })

    return redirects[0]
  }

  const update = async (redirectDto: IUpdateRedirectData) => {
    const redirect = redirectDomainService.redirects.get(redirectDto.id)

    Validator.assertsDefined(redirect)

    redirect.writeCache(redirectDto)

    await redirectRepository.update(redirect)

    return redirect
  }

  const getOneFromCache = (ref: IRef) => {
    return Validator.parseDefined(redirectDomainService.redirects.get(ref.id))
  }

  const getAllFromCache = () => {
    return Array.from(redirectDomainService.redirects.values())
  }

  return {
    create,
    getAll,
    getAllFromCache,
    getOne,
    getOneFromCache,
    removeMany,
    update,
  }
}
