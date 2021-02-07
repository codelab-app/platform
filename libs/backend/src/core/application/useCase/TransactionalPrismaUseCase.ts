import { UseCase } from './UseCase'
import { PrismaService } from '@codelab/backend'

export abstract class TransactionalPrismaUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse
> implements UseCase<TUseCaseRequestPort, TUseCaseDtoResponse> {
  public operations: Array<Promise<any>> = []

  constructor(protected readonly prismaService: PrismaService) {}

  /**
   * Add to operations, this can be used to build queries to be executed in other services
   */
  abstract prepare(request: TUseCaseRequestPort): void

  /**
   * Executed by GraphQL resolvers, first operation is returned
   */
  async execute(request: TUseCaseRequestPort) {
    this.prepare(request)

    return (await this.prismaService.$transaction(this.operations))[0]
  }
}
