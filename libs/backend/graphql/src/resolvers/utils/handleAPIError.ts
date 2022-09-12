import { ApolloError } from 'apollo-server-micro'

export const handleAPIError = async (res: Response, requestName: string) => {
  let parsedBody = {}

  if (!parsedBody) {
    try {
      parsedBody = await res.json()
      // eslint-disable-next-line no-empty
    } catch {}
  }

  if (res.status !== 200) {
    console.error(
      `[${requestName}] Fail to make request. HTTTP: ${
        res.status
      }. Response: ${JSON.stringify(parsedBody, null, 2)}`,
    )
    throw new ApolloError('Something went wrong')
  }
}
