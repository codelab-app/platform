import type {
  IRedirectModel,
  IRedirectRepository,
} from '@codelab/frontend/abstract/domain'
import type { RedirectOptions, RedirectWhere } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/schema'
import {
  CreateRedirects,
  DeleteRedirects,
  GetRedirects,
  UpdateRedirects,
} from './redirect.api.graphql.gen'

export const redirectRepository: IRedirectRepository = {
  add: async (redirect: IRedirectModel) => {
    const {
      createRedirects: { redirects },
    } = await CreateRedirects({ input: redirect.toCreateInput() })

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

  update: async (redirect: IRedirectModel) => {
    const {
      updateRedirects: { redirects },
    } = await UpdateRedirects({
      update: redirect.toUpdateInput(),
      where: { id: redirect.id },
    })

    const updatedRedirect = redirects[0]

    Validator.assertsDefined(updatedRedirect)

    return updatedRedirect
  },
}
