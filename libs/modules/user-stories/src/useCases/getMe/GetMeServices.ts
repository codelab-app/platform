import { ServiceConfig } from 'xstate/lib/types'
import { GetMeGql } from './GetMeRequest'
import { query } from '@codelab/alpha/shared/utils'
import { getApolloClient } from '@codelab/frontend'
import { getAuthTokenFromLocalStorage } from '@codelab/modules/user-stories'

export const getMeServices: Record<string, ServiceConfig<any, any>> = {
  executeGetMe: async (context, event) => {
    const token = getAuthTokenFromLocalStorage()

    if (!token) {
      // No point in trying
      throw new Error('No point')
    }

    const result = await query(getApolloClient(), {
      query: GetMeGql,
    })

    return {
      ...result,
      data: {
        ...result.data,
        getMe: {
          ...result.data.getMe,
          accessToken: token,
        },
      },
    }
  },
}
