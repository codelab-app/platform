/* eslint-disable react-hooks/rules-of-hooks */

import { QueryHookConfigFragment } from '@codelab/frontend/modules/element'
import { useExecuteLambdaMutation } from '@codelab/frontend/modules/lambda'
import axios from 'axios'
import { useQuery } from 'react-query'
import { QueryHookHandler } from './QueryHookHandler'

export const useQueryHook: QueryHookHandler = (
  config: QueryHookConfigFragment,
) => {
  let body = config.body ?? undefined

  try {
    if (body) {
      body = JSON.parse(body)
    }
  } catch (e) {
    //
  }

  const lambdaId = config.lambdaId

  if (lambdaId) {
    const [executeLambda] = useExecuteLambdaMutation()

    return useQuery(config.queryKey, (context) =>
      executeLambda({
        variables: {
          input: {
            lambdaId,
            payload: JSON.stringify(context),
          },
        },
      }),
    )
  }

  const { method, url } = config

  if (!url) {
    return
  }

  return useQuery(config.queryKey, (context) =>
    axios({
      data: body,
      url,
      method: method ?? 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }).then((r) => r.data),
  )
}
