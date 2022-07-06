import { ApolloError } from 'apollo-server-micro'

export const handleRestError = (
  res: Response,
  body: any,
  requestName: string,
) => {
  if (res.status !== 200) {
    console.error(
      `[${requestName}] Fail to make request. Response: ${JSON.stringify(
        body || {},
        null,
        2,
      )}`,
    )
    throw new ApolloError('Something went wrong')
  }
}
