import { ServiceConfig } from 'xstate/lib/types'
import { GetMeGql } from './GetMeRequest'
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

    const { data } = await query(getApolloClient(), {
      query: GetMeGql,
    })

    return data
  },
}
