import { diContainer } from './di-container'

export const initializeServices = () => {
  const database = new Database()
  const userService = new UserService(database)

  diContainer.register('database', database)
  diContainer.register('userService', userService)
}
