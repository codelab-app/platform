import { ApolloError } from 'apollo-server-micro'

export const handleRestError = async (
  res: Response,
  body: any,
  requestName: string,
) => {
  let parsedBody = body

  if (!parsedBody) {
    try {
      parsedBody = await res.json()
      // eslint-disable-next-line no-empty
    } catch {}
  }

  if (res.status !== 200) {
    console.error(
      `[${requestName}] Fail to make request. Response: ${JSON.stringify(
        parsedBody || {},
        null,
        2,
      )}`,
    )
    throw new ApolloError('Something went wrong')
  }
}
