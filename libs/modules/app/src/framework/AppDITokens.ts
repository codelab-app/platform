export class AppDITokens {
  public static readonly GetAppsUseCase: unique symbol = Symbol(
    'GetAppsUseCase',
  )

  public static readonly DeleteAppUseCase: unique symbol = Symbol(
    'DeleteAppUseCase',
  )

  public static readonly CreateAppUseCase: unique symbol = Symbol(
    'CreateAppUseCase',
  )

  public static readonly AppRepository: unique symbol = Symbol('AppRepository')
}
