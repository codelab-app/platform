export class GraphDITokens {
  public static readonly CreateGraphUseCase: unique symbol = Symbol(
    'CreateGraphUseCase',
  )

  public static readonly UpdateGraphUseCase: unique symbol = Symbol(
    'UpdateGraphUseCase',
  )

  public static readonly DeleteGraphUseCase: unique symbol = Symbol(
    'DeleteGraphUseCase',
  )

  public static readonly GetGraphUseCase: unique symbol = Symbol(
    'GetGraphUseCase',
  )

  public static readonly AddChildNodeUseCase: unique symbol = Symbol(
    'AddChildNodeUseCase',
  )

  // Handlers
  public static readonly CreateGraphCommandHandler: unique symbol = Symbol(
    'CreateGraphCommandHandler',
  )

  public static readonly EditGraphCommandHandler: unique symbol = Symbol(
    'EditGraphCommandHandler',
  )

  public static readonly DeleteGraphCommandHandler: unique symbol = Symbol(
    'DeleteGraphCommandHandler',
  )

  public static readonly AddChildNodeCommandHandler: unique symbol = Symbol(
    'AddChildNodeCommandHandler',
  )

  // Repositories

  public static readonly GraphRepository: unique symbol = Symbol(
    'GraphRepository',
  )
}
