import type { IAuthGuardService } from '@codelab/frontend/abstract/application'
import type {
  IAuthGuardCreateFormData,
  IAuthGuardModel,
  IAuthGuardUpdateFormData,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { AuthGuardWhere } from '@codelab/shared/infra/gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { PageType } from '@codelab/frontend/abstract/types'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/typebox'

export const useAuthGuardService = (): IAuthGuardService => {
  const { authGuardDomainService, resourceDomainService } = useDomainStore()

  const create = async (data: IAuthGuardCreateFormData) => {
    const authGuard = await authGuardRepository.add({
      ...data,
      config: {
        data: JSON.stringify(data.config.data),
        id: data.config.id,
      },
    })

    Validator.assertsDefined(authGuard)

    return authGuard
  }

  const removeMany = async (authGuards: Array<IAuthGuardModel>) => {
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

  const update = async (authGuard: IAuthGuardUpdateFormData) => {
    await authGuardRepository.update(
      { id: authGuard.id },
      {
        ...authGuard,
        config: {
          data: JSON.stringify(authGuard.config.data),
          id: authGuard.config.id,
        },
      },
    )

    return authGuard
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.push(PageType.AuthGuards())
    },
    open: (router: AppRouterInstance, { id }: IRef) => {
      router.push(PageType.AuthGuardsUpdate({ id }))
    },
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.push(PageType.AuthGuards())
    },
    open: (router: AppRouterInstance) => {
      router.push(PageType.AuthGuardsCreate())
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
