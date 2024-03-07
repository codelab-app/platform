import { ApolloError } from '@apollo/client'
import { prettifyForConsole } from '@codelab/shared/utils'

export const handleAPIError = async (res: Response, requestName: string) => {
  const parsedBody = await res.json()

  if (res.status !== 200) {
    console.error(
      `[${requestName}] Fail to make request. HTTP: ${
        res.status
      }. Response: ${prettifyForConsole(parsedBody)}`,
    )
    throw new ApolloError({ errorMessage: 'Something went wrong' })
  }
}
