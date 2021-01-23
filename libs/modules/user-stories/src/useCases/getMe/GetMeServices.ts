import { ServiceConfig } from 'xstate/lib/types'
import {
  GetMeDocument,
  GetMeQuery,
} from '../../../../../../apps/web/src/apollo/types.generated'
import { query } from '@codelab/alpha/shared/utils'
import { getApolloClient, getAuthToken } from '@codelab/frontend'

const delayPromise = (duration: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve({}), duration)
  })

export const getMeServices: Record<string, ServiceConfig<any, any>> = {
  executeGetMe: async (context, event) => {
    const token = getAuthToken()

    await delayPromise(2000)

    if (!token) {
      throw new Error('User not authenticated!')
    }

    const { data } = await query<GetMeQuery>(getApolloClient(), {
      query: GetMeDocument,
    })

    return data
  },
}
