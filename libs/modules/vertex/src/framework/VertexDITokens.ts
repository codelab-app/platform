export class VertexDITokens {
  // Use-cases

  public static readonly CreateVertexUseCase: unique symbol = Symbol(
    'CreateVertexUseCase',
  )

  public static readonly UpdateVertexUseCase: unique symbol = Symbol(
    'UpdateVertexUseCase',
  )

  public static readonly DeleteVertexUseCase: unique symbol = Symbol(
    'DeleteVertexUseCase',
  )

  public static readonly GetVertexUseCase: unique symbol = Symbol(
    'GetVertexUseCase',
  )

  // Handlers
  public static readonly CreateVertexCommandHandler: unique symbol = Symbol(
    'CreateVertexCommandHandler',
  )

  public static readonly EditVertexCommandHandler: unique symbol = Symbol(
    'EditVertexCommandHandler',
  )

  public static readonly DeleteVertexCommandHandler: unique symbol = Symbol(
    'DeleteVertexCommandHandler',
  )

  // Repositories

  public static readonly VertexRepository: unique symbol = Symbol(
    'VertexRepository',
  )
}
