import type { IRedirectService } from '@codelab/frontend/abstract/application'
import type {
  IRedirectCreateFormData,
  IRedirectModel,
  IRedirectUpdateFormData,
} from '@codelab/frontend/abstract/domain'
import type { PageContextParams } from '@codelab/frontend/abstract/types'
import type { RedirectWhere } from '@codelab/shared/infra/gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { PageType } from '@codelab/frontend/abstract/types'
import { redirectRepository } from '@codelab/frontend-domain-redirect/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

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

  const createPopover = {
    close: (router: AppRouterInstance, params: PageContextParams) => {
      router.back()
    },
    open: (router: AppRouterInstance, params: PageContextParams) => {
      router.push(PageType.PageRedirectCreate(params))
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (
      router: AppRouterInstance,
      params: PageContextParams & { redirectId: string },
    ) => {
      router.push(PageType.PageRedirectUpdate(params))
    },
  }

  return {
    create,
    createPopover,
    getAll,
    getOne,
    removeMany,
    update,
    updatePopover,
  }
}
