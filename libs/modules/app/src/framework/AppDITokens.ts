export class AppDITokens {
  public static readonly GetAppUseCase: unique symbol = Symbol('GetAppUseCase')

  public static readonly GetAppsUseCase: unique symbol = Symbol(
    'GetAppsUseCase',
  )

  public static readonly GetAppService: unique symbol = Symbol('GetAppService')

  public static readonly DeleteAppUseCase: unique symbol = Symbol(
    'DeleteAppUseCase',
  )

  public static readonly CreateAppUseCase: unique symbol = Symbol(
    'CreateAppUseCase',
  )

  public static readonly AppRepository: unique symbol = Symbol('AppRepository')
}
