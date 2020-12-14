export class UserDITokens {
  // Use-cases

  public static readonly CreateUserUseCase: unique symbol = Symbol(
    'CreateUserUseCase',
  )

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

  public static readonly UserRepository: unique symbol = Symbol(
    'UserRepository',
  )
}
