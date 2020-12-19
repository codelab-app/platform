export class EdgeDITokens {
  // Use-cases

  public static readonly CreateEdgeUseCase: unique symbol = Symbol(
    'CreateEdgeUseCase',
  )

  public static readonly UpdateEdgeUseCase: unique symbol = Symbol(
    'UpdateEdgeUseCase',
  )

  public static readonly DeleteEdgeUseCase: unique symbol = Symbol(
    'DeleteEdgeUseCase',
  )

  public static readonly GetEdgeUseCase: unique symbol = Symbol(
    'GetEdgeUseCase',
  )

  // Handlers
  public static readonly CreateEdgeCommandHandler: unique symbol = Symbol(
    'CreateEdgeCommandHandler',
  )

  public static readonly EditEdgeCommandHandler: unique symbol = Symbol(
    'EditEdgeCommandHandler',
  )

  public static readonly DeleteEdgeCommandHandler: unique symbol = Symbol(
    'DeleteEdgeCommandHandler',
  )

  // Repositories

  public static readonly EdgeRepository: unique symbol = Symbol(
    'EdgeRepository',
  )
}
