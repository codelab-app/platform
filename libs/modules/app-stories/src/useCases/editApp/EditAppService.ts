import { ServiceConfig } from 'xstate/lib/types'
import { UpdateAppInput } from '../../../../app/src/core/application/useCases/updateApp/UpdateAppInput'
import { UpdateAppGql } from './EditAppInput.generated'
import { getApolloClient, mutate } from '@codelab/frontend'

export const editAppService: Record<string, ServiceConfig<any, any>> = {
  editApp: async (context, { data }) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 500))

    const input: UpdateAppInput = {
      id: data.id,
      title: data.title,
    }

    return mutate(getApolloClient(), {
      mutation: UpdateAppGql,
      variables: { input },
    })
  },
}
