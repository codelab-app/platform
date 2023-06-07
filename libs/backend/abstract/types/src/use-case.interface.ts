import type { Tracer } from '@opentelemetry/api'

export interface IUseCase<IRequest = void, IResponse = void> {
  // tracer: Tracer

  // _execute(request: IRequest): IResponse | Promise<IResponse>
  execute(request: IRequest): IResponse | Promise<IResponse>
}
