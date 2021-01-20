export class PageDITokens {
  public static readonly DeletePageUseCase: unique symbol = Symbol(
    'DeletePageUseCase',
  )

  public static readonly GetPageUseCase: unique symbol = Symbol(
    'GetPageUseCase',
  )

  public static readonly GetPagesUseCase: unique symbol = Symbol(
    'GetPagesUseCase',
  )

  public static readonly CreatePageUseCase: unique symbol = Symbol(
    'CreatePageUseCase',
  )

  public static readonly CodelabEventsService: unique symbol = Symbol(
    'CodelabEventsService',
  )

  public static readonly GraphQLPubSub: unique symbol = Symbol('GraphQLPubSub')

  // Repositories

  public static readonly PageRepository: unique symbol = Symbol(
    'PageRepository',
  )
}
