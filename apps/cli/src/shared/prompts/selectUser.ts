import { Repository } from '@codelab/backend/infra/adapter/neo4j'

export interface SelectUserAnswer {
  selectedAuth0Id: string
}

export const selectUserPrompt = async () => {
  const User = await Repository.instance.User
  const users = await User.find()

  return {
    choices: users.map((user) => ({
      name: user.email,
      value: user.auth0Id,
    })),
    message: 'Select which user to be owner of the app',
    name: 'selectedAuth0Id',
    type: 'list',
  }
}
