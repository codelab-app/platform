import type { IRedirectService } from '@codelab/frontend/abstract/application'
import type {
  IRedirectCreateFormData,
  IRedirectModel,
  IRedirectUpdateFormData,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { RedirectWhere } from '@codelab/shared/infra/gql'

import { redirectRepository } from '@codelab/frontend-domain-redirect/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/schema'

export const useRedirectService = (): IRedirectService => {
  const { redirectDomainService } = useDomainStore()

  const create = async (data: IRedirectCreateFormData) => {
    // const redirect = redirectDomainService.hydrate(redirectDto)

    return await redirectRepository.add(data)
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

  const update = async (data: IRedirectUpdateFormData) => {
    // const redirect = redirectDomainService.redirects.get(redirectDto.id)

    // Validator.assertsDefined(redirect)

    // redirect.writeCache(redirectDto)

    return await redirectRepository.update({ id: data.id }, data)
  }

  const getOneFromCache = (ref: IRef) => {
    return redirectDomainService.redirects.get(ref.id)
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
