import { UpsertDgraphUserGql, UpsertDgraphUserMutation } from '@codelab/dgraph'
import { getApolloClient } from '@codelab/frontend/apollo'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  console.log(req.body)

  const client = getApolloClient()
  const { user, context } = req.body

  const { data } = await client.mutate<UpsertDgraphUserMutation>({
    mutation: UpsertDgraphUserGql,
    variables: {
      input: {
        email: user.email,
      },
    },
  })

  // Create new user
  console.log(data)

  return res.json({
    data,
  })
}

export default handler
