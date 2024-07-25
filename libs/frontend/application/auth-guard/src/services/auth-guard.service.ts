import type { IAuthGuardService } from '@codelab/frontend/abstract/application'
import type {
  IAuthGuardModel,
  ICreateAuthGuardData,
  IUpdateAuthGuardData,
} from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import type { AuthGuardWhere } from '@codelab/shared/abstract/codegen'
import type { IPropDto } from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import { v4 } from 'uuid'

export const useAuthGuardService = (): IAuthGuardService => {
  const { authGuardDomainService, resourceDomainService } = useDomainStore()

  const create = async (data: ICreateAuthGuardData) => {
    const { config } = data

    const configDto: IPropDto = {
      data: JSON.stringify(config.data),
      id: v4(),
    }

    const authGuard = authGuardDomainService.hydrate({
      ...data,
      config: configDto,
    })

    await authGuardRepository.add(authGuard)

    return authGuard
  }

  const remove = async (authGuards: Array<IAuthGuardModel>) => {
    for (const authGuard of authGuards) {
      authGuardDomainService.authGuards.delete(authGuard.id)
    }

    return await authGuardRepository.delete(authGuards)
  }

  const getAll = async (where: AuthGuardWhere = {}) => {
    const { items: authGuards } = await authGuardRepository.find(where)

    return authGuards.map((authGuard) => {
      resourceDomainService.hydrate(authGuard.resource)

      return authGuardDomainService.hydrate(authGuard)
    })
  }

  const getOne = async (id: string) => {
    const [authGuard] = await getAll({ id })

    return authGuard
  }

  const getSelectAuthGuardOptions = async () => {
    const authGuards = await getAll()

    return authGuards.map((authGuard) => ({
      label: authGuard.name,
      value: authGuard.id,
    }))
  }

  const update = async ({
    config: configData,
    id,
    name,
    resource,
    responseTransformer,
  }: IUpdateAuthGuardData) => {
    const authGuard = authGuardDomainService.authGuards.get(id)

    assertIsDefined(authGuard)

    const config = authGuard.config

    config.writeCache({ data: JSON.stringify(configData.data) })

    authGuard.writeCache({ name, resource, responseTransformer })

    await authGuardRepository.update(authGuard)

    return authGuard
  }

  const authGuard = (id: string) => {
    return authGuardDomainService.authGuards.get(id)
  }

  return {
    authGuard,
    authGuardList: [...authGuardDomainService.authGuards.values()],
    create,
    getAll,
    getOne,
    getSelectAuthGuardOptions,
    remove,
    update,
  }
}
