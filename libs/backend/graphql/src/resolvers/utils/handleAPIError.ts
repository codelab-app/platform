import { ApolloError } from 'apollo-server-micro'

export const handleAPIError = async (res: Response, requestName: string) => {
  const parsedBody = await res.json()

  if (res.status !== 200) {
    console.error(
      `[${requestName}] Fail to make request. HTTP: ${
        res.status
      }. Response: ${JSON.stringify(parsedBody, null, 2)}`,
    )
    throw new ApolloError('Something went wrong')
  }
}
