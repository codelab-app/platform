import type { IUseCase } from '@codelab/backend/abstract/types'
import type { MaybePromise } from '@codelab/shared/abstract/types'
import { withTracing } from '@codelab/shared/infra/otel'
import type { Span } from '@opentelemetry/api'

export abstract class UseCase<IRequest = void, IResponse = void>
  implements IUseCase<IRequest, IResponse>
{
  execute(request: IRequest): MaybePromise<IResponse> {
    return withTracing<IResponse>(`${this.constructor.name}.execute()`, () =>
      this._execute(request),
    )()
  }

  protected abstract _execute(request: IRequest): IResponse | Promise<IResponse>
}
