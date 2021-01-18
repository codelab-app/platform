import { ServiceConfig } from 'xstate/lib/types'
import { UpdateAppInput } from '../../../../app/src/core/application/useCases/updateApp/UpdateAppInput'
import { EditAppGql } from './EditAppInput.generated'
import { mutate } from '@codelab/alpha/shared/utils'
import { getApolloClient } from '@codelab/frontend'

export const editAppService: Record<string, ServiceConfig<any, any>> = {
  editApp: async (context, { data }) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 500))

    const input: UpdateAppInput = {
      id: data.id,
      title: data.title,
    }

    return mutate(getApolloClient(), {
      mutation: EditAppGql,
      variables: { input },
    })
  },
}
