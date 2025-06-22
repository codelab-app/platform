import type { IAuthGuardService } from '@codelab/frontend-abstract-application'
import type {
  IAuthGuardCreateFormData,
  IAuthGuardModel,
  IAuthGuardUpdateFormData,
} from '@codelab/frontend-abstract-domain'
import type { IRef } from '@codelab/shared-abstract-core'
import type { AuthGuardWhere } from '@codelab/shared-infra-gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { authGuardRepository } from '@codelab/frontend-domain-auth-guard/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Validator } from '@codelab/shared-infra-typebox'
import { useMemo } from 'react'

export const useAuthGuardService = (): IAuthGuardService => {
  const { authGuardDomainService, resourceDomainService } = useDomainStore()

  const create = async (data: IAuthGuardCreateFormData) => {
    const authGuard = await authGuardRepository.add(
      {
        ...data,
        config: {
          data: JSON.stringify(data.config.data),
          id: data.config.id,
        },
      },
      {
        revalidateTags: [CACHE_TAGS.AuthGuard.list()],
      },
    )

    Validator.assertsDefined(authGuard)

    return authGuard
  }

  const removeMany = async (authGuards: Array<IAuthGuardModel>) => {
    for (const authGuard of authGuards) {
      authGuardDomainService.authGuards.delete(authGuard.id)
    }

    return await authGuardRepository.delete(authGuards, {
      revalidateTags: [CACHE_TAGS.AuthGuard.list()],
    })
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
      {
        revalidateTags: [CACHE_TAGS.AuthGuard.list()],
      },
    )

    return authGuard
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.push(RoutePaths.AuthGuard.base())
    },
    open: (router: AppRouterInstance, { id }: IRef) => {
      router.push(RoutePaths.AuthGuard.update({ id }))
    },
  }

  const createPopover = useMemo(
    () => ({
      close: (router: AppRouterInstance) => {
        router.push(RoutePaths.AuthGuard.base())
      },
      open: (router: AppRouterInstance) => {
        router.push(RoutePaths.AuthGuard.create())
      },
    }),
    [],
  )

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
