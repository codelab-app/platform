import { useExecuteLambdaMutation } from '@codelab/frontend/modules/lambda'
import { IQueryLambdaHookConfig } from '@codelab/shared/abstract/core'
import { useQuery } from 'react-query'
import { HookHandler } from '../HookHandler'

export const useQueryLambdaHook: HookHandler = (
  config: IQueryLambdaHookConfig,
) => {
  const lambdaId = config.lambdaId
  const [executeLambda] = useExecuteLambdaMutation()

  return useQuery(config.queryKey, (context) =>
    executeLambda({
      variables: {
        input: {
          lambdaId,
          payload: JSON.stringify(context),
        },
      },
    }).then((r: any) => {
      try {
        const payload = r.data?.executeLambda?.payload

        return payload ? JSON.parse(payload) : undefined
      } catch (e) {
        console.warn('Error while processing lambda payload: ', e)
      }

      return undefined
    }),
  )
}
