import type { IUseCase } from '@codelab/backend/abstract/types'
import { withTracing } from '@codelab/shared/infra/otel'

export abstract class UseCase<IRequest = void, IResponse = void>
  implements IUseCase<IRequest, IResponse>
{
  // tracer = trace.getTracer(CLI_TRACER)

  execute = withTracing<IResponse, [IRequest]>(
    `${this.constructor.name}.execute()`,
    (request: IRequest) => {
      const result = this._execute(request)

      return result instanceof Promise ? result : Promise.resolve(result)
    },
  )

  protected abstract _execute(request: IRequest): IResponse | Promise<IResponse>
}
