import type {
  IRedirectModel,
  IRedirectRepository,
} from '@codelab/frontend/abstract/domain'
import type { IRedirectDto, IRef } from '@codelab/shared/abstract/core'
import type { RedirectOptions, RedirectWhere } from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/schema'
import {
  redirectMapper,
  redirectServerActions,
} from '@codelab/shared-domain-module/redirect'

const { CreateRedirects, DeleteRedirects, GetRedirects, UpdateRedirects } =
  redirectServerActions()

export const redirectRepository: IRedirectRepository = {
  add: async (redirect: IRedirectDto) => {
    const {
      createRedirects: { redirects },
    } = await CreateRedirects({ input: redirectMapper.toCreateInput(redirect) })

    const createdRedirect = redirects[0]

    Validator.assertsDefined(createdRedirect)

    return createdRedirect
  },

  delete: async (redirects: Array<IRedirectModel>) => {
    const {
      deleteRedirects: { nodesDeleted },
    } = await DeleteRedirects({
      where: { id_IN: redirects.map((redirect) => redirect.id) },
    })

    return nodesDeleted
  },

  find: async (where?: RedirectWhere, options?: RedirectOptions) => {
    return GetRedirects({ options, where })
  },

  findOne: async (where: RedirectWhere) => {
    return (await redirectRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, redirect: IRedirectDto) => {
    const {
      updateRedirects: { redirects },
    } = await UpdateRedirects({
      update: redirectMapper.toUpdateInput(redirect),
      where: { id },
    })

    const updatedRedirect = redirects[0]

    Validator.assertsDefined(updatedRedirect)

    return updatedRedirect
  },
}
