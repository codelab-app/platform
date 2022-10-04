import { Repository } from '@codelab/backend/infra/adapter/neo4j'

export interface SelectUserAnswer {
  selectedUserId: string
}

export const selectUserPrompt = async () => {
  const User = await Repository.instance.User
  const users = await User.find()

  return {
    type: 'list',
    name: 'selectedUserId',
    message: 'Select which user to be owner of the app',
    choices: users.map((user) => ({
      name: user.email,
      value: user.id,
    })),
  }
}
