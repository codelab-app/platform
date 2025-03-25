import type {
  IRedirectService,
  PageContextParams,
} from '@codelab/frontend/abstract/application'
import type {
  IRedirectCreateFormData,
  IRedirectUpdateFormData,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { RedirectWhere } from '@codelab/shared/infra/gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { redirectRepository } from '@codelab/frontend-domain-redirect/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

export const useRedirectService = (): IRedirectService => {
  const { redirectDomainService } = useDomainStore()

  const create = async (data: IRedirectCreateFormData) => {
    // const redirect = redirectDomainService.hydrate(redirectDto)

    return await redirectRepository.add(data, {
      revalidateTag: CACHE_TAGS.Redirect.list(),
    })
  }

  const removeMany = async (redirectsModel: Array<IRef>) => {
    redirectsModel.forEach((redirect) =>
      redirectDomainService.redirects.delete(redirect.id),
    )

    return await redirectRepository.delete(redirectsModel, {
      revalidateTag: CACHE_TAGS.Redirect.list(),
    })
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

    return await redirectRepository.update({ id: data.id }, data, {
      revalidateTag: CACHE_TAGS.Redirect.list(),
    })
  }

  const createPopover = {
    close: (router: AppRouterInstance, params: PageContextParams) => {
      router.push(RoutePaths.PageList(params))
    },
    open: (router: AppRouterInstance, params: PageContextParams) => {
      router.push(RoutePaths.PageRedirectCreate(params))
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance, params: PageContextParams) => {
      router.push(RoutePaths.PageList(params))
    },
    open: (
      router: AppRouterInstance,
      params: PageContextParams & { redirectId: string },
    ) => {
      router.push(RoutePaths.PageRedirectUpdate(params))
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
