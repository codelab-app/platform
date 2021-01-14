export class PageDITokens {
  public static readonly GetPageUseCase: unique symbol = Symbol(
    'GetPageUseCase',
  )

  public static readonly GetPagesUseCase: unique symbol = Symbol(
    'GetPagesUseCase',
  )

  public static readonly CreatePageUseCase: unique symbol = Symbol(
    'CreatePageUseCase',
  )

  // Repositories

  public static readonly PageRepository: unique symbol = Symbol(
    'PageRepository',
  )
}
