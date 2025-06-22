import type { IRedirectDto, IRef } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type {
  RedirectOptions,
  RedirectWhere,
} from '@codelab/shared-infra-gqlgen'

import { type IRedirectRepository } from '@codelab/frontend-abstract-domain'
import {
  redirectMapper,
  redirectServerActions,
} from '@codelab/shared-domain-module-redirect'
import { Validator } from '@codelab/shared-infra-typebox'

const {
  CreateRedirects,
  DeleteRedirects,
  GetRedirectsPreview,
  UpdateRedirects,
} = redirectServerActions

export const redirectRepository: IRedirectRepository = {
  add: async (redirect: IRedirectDto, next?: NextFetchOptions) => {
    const {
      createRedirects: { redirects },
    } = await CreateRedirects(
      { input: redirectMapper.toCreateInput(redirect) },
      next,
    )

    const createdRedirect = redirects[0]

    Validator.assertsDefined(createdRedirect)

    return createdRedirect
  },

  delete: async (redirects: Array<IRef>, next?: NextFetchOptions) => {
    const {
      deleteRedirects: { nodesDeleted },
    } = await DeleteRedirects(
      {
        where: { id_IN: redirects.map((redirect) => redirect.id) },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: RedirectWhere,
    options?: RedirectOptions,
    next?: NextFetchOptions,
  ) => {
    return GetRedirectsPreview(
      {
        options,
        where,
      },
      next,
    )
  },

  findOne: async (where: RedirectWhere, next?: NextFetchOptions) => {
    return (await redirectRepository.find(where, undefined, next)).items[0]
  },

  update: async (
    { id }: IRef,
    redirect: IRedirectDto,
    next?: NextFetchOptions,
  ) => {
    const {
      updateRedirects: { redirects },
    } = await UpdateRedirects(
      {
        update: redirectMapper.toUpdateInput(redirect),
        where: { id },
      },
      next,
    )

    const updatedRedirect = redirects[0]

    Validator.assertsDefined(updatedRedirect)

    return updatedRedirect
  },
}
