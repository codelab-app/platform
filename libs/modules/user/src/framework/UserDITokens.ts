export class UserDITokens {
  public static readonly GetMeUseCase: unique symbol = Symbol('GetMeUseCase')

  public static readonly LoginUserUseCase: unique symbol = Symbol(
    'LoginUserUseCase',
  )

  public static readonly UpdateUserUseCase: unique symbol = Symbol(
    'UpdateUserUseCase',
  )

  public static readonly RegisterUserUseCase: unique symbol = Symbol(
    'RegisterUserUseCase',
  )
  // Use-cases

  public static readonly DeleteUserUseCase: unique symbol = Symbol(
    'DeleteUserUseCase',
  )

  public static readonly GetUserUseCase: unique symbol = Symbol(
    'GetUserUseCase',
  )

  public static readonly ValidateUserUseCase: unique symbol = Symbol(
    'ValidateUserUseCase',
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

  public static readonly UserRepository: unique symbol = Symbol(
    'UserRepository',
  )

  public static readonly AppRepository: unique symbol = Symbol('AppRepository')

  public static readonly AuthService: unique symbol = Symbol('AuthService')
}
