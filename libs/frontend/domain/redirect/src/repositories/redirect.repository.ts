import type {
  IRedirectModel,
  IRedirectRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  RedirectOptions,
  RedirectWhere,
} from '@codelab/frontend/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import { redirectApi } from './redirect.api'

export const redirectRepository: IRedirectRepository = {
  add: async (redirect: IRedirectModel) => {
    const {
      createRedirects: { redirects },
    } = await redirectApi.CreateRedirects({ input: redirect.toCreateInput() })

    const createdRedirect = redirects[0]

    assertIsDefined(createdRedirect)

    return createdRedirect
  },

  delete: async (redirects: Array<IRedirectModel>) => {
    const {
      deleteRedirects: { nodesDeleted },
    } = await redirectApi.DeleteRedirects({
      where: { id_IN: redirects.map((redirect) => redirect.id) },
    })

    return nodesDeleted
  },

  find: async (where?: RedirectWhere, options?: RedirectOptions) => {
    return redirectApi.GetRedirects({ options, where })
  },

  findOne: async (where: RedirectWhere) => {
    return (await redirectRepository.find(where)).items[0]
  },

  update: async (redirect: IRedirectModel) => {
    const {
      updateRedirects: { redirects },
    } = await redirectApi.UpdateRedirects({
      update: redirect.toUpdateInput(),
      where: { id: redirect.id },
    })

    const updatedRedirect = redirects[0]

    assertIsDefined(updatedRedirect)

    return updatedRedirect
  },
}
