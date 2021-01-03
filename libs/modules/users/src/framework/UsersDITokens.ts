export class UsersDITokens {
  public static readonly UserService: unique symbol = Symbol('UserService')

  public static readonly GetMeUseCase: unique symbol = Symbol('GetMeUseCase')

  public static readonly LoginUserUseCase: unique symbol = Symbol(
    'LoginUserUseCase',
  )

  public static readonly RegisterUserUseCase: unique symbol = Symbol(
    'RegisterUserUseCase',
  )
  // Use-cases

  public static readonly EditUserUseCase: unique symbol = Symbol(
    'EditUserUseCase',
  )

  public static readonly DeleteUserUseCase: unique symbol = Symbol(
    'DeleteUserUseCase',
  )

  public static readonly GetUserUseCase: unique symbol = Symbol(
    'GetUserUseCase',
  )

  // Handlers
  public static readonly CreateUserCommandHandler: unique symbol = Symbol(
    'CreateUserCommandHandler',
  )

  public static readonly EditUserCommandHandler: unique symbol = Symbol(
    'CreateUserCommandHandler',
  )

  public static readonly DeleteUserCommandHandler: unique symbol = Symbol(
    'CreateUserCommandHandler',
  )

  // Repositories

  public static readonly UsersRepository: unique symbol = Symbol(
    'UsersRepository',
  )

  public static readonly AppRepository: unique symbol = Symbol('AppRepository')
}
