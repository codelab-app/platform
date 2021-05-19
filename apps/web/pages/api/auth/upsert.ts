import { CreateUserGql, CreateUserMutation } from '@codelab/dgraph'
import { getApolloClient } from '@codelab/frontend/apollo'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const client = getApolloClient()
  const { user } = req.body

  const { data } = await client.mutate<CreateUserMutation>({
    mutation: CreateUserGql,
    variables: {
      input: {
        email: user.email,
      },
    },
  })

  return res.json({
    data,
  })
}

export default handler
