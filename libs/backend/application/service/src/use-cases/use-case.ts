import type { IUseCase } from '@codelab/backend/abstract/types'
import { withTracing } from '@codelab/shared/infra/otel'
import { trace } from '@opentelemetry/api'

export abstract class UseCase<IRequest = void, IResponse = void>
  implements IUseCase<IRequest, IResponse>
{
  tracer = trace.getTracer('cli-tracer')

  execute = withTracing<IResponse, [IRequest]>(
    `${this.constructor.name}.execute()`,
    (request: IRequest) => Promise.resolve(this._execute(request)),
  )

  protected abstract _execute(request: IRequest): IResponse | Promise<IResponse>
}
