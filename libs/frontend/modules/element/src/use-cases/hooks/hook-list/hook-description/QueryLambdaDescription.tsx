import { ConditionalView } from '@codelab/frontend/view/components'
import { useEffect } from 'react'
import { useLazyGetLambdaNameQuery } from '../../../../store'
import { LambdaDescriptionProps } from './types'

export const QueryLambdaDescription = ({ config }: LambdaDescriptionProps) => {
  // FIXME optimize this if needed to either use getLambdas and fetch them all at once
  // or add a resolve field in the API to get the lambda along with the hook

  const [getLambda, { data: lambda }] = useLazyGetLambdaNameQuery()

  useEffect(() => {
    getLambda({
      variables: {
        input: {
          lambdaId: config.lambdaId,
        },
      },
    })
  }, [])

  return (
    <ConditionalView condition={Boolean(lambda?.getLambda)}>
      <span>Lambda - {lambda?.getLambda?.name}</span>
    </ConditionalView>
  )
}
