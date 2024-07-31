import type { IRedirectService } from '@codelab/frontend/abstract/application'
import type {
  ICreateRedirectData,
  IRedirectModel,
  IUpdateRedirectData,
} from '@codelab/frontend/abstract/domain'
import { redirectRepository } from '@codelab/frontend-domain-redirect/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { RedirectWhere } from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'

export const useRedirectService = (): IRedirectService => {
  const { redirectDomainService } = useDomainStore()
  const redirectList = [...redirectDomainService.redirects.values()]

  const create = async (redirectDto: ICreateRedirectData) => {
    const redirect = redirectDomainService.hydrate(redirectDto)

    await redirectRepository.add(redirect)

    return redirect
  }

  const remove = async (redirectsModel: Array<IRedirectModel>) => {
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

    assertIsDefined(redirect)

    redirect.writeCache(redirectDto)

    await redirectRepository.update(redirect)

    return redirect
  }

  const redirect = (id: string) => {
    return redirectDomainService.redirects.get(id)
  }

  return {
    create,
    getAll,
    getOne,
    redirect,
    redirectList,
    remove,
    update,
  }
}
