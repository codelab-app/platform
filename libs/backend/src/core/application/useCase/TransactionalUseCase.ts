import { UseCase } from './UseCase'

export interface TransactionalUseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
  extends UseCase<TUseCaseRequestPort, TUseCaseDtoResponse> {
  onCommit?: (
    response: TUseCaseDtoResponse,
    request: TUseCaseRequestPort,
  ) => Promise<void>
  onRollback?: (error: Error, request: TUseCaseRequestPort) => Promise<void>
}
