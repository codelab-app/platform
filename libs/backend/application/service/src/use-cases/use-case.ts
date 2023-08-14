import type { IUseCase } from '@codelab/backend/abstract/types'
import type { MaybePromise } from '@codelab/shared/abstract/types'
import { withActiveSpan } from '@codelab/shared/infra/otel'

export abstract class UseCase<IRequest = void, IResponse = void>
  implements IUseCase<IRequest, IResponse>
{
  execute(request: IRequest): MaybePromise<IResponse> {
    return withActiveSpan<IResponse>(`${this.constructor.name}.execute()`, () =>
      this._execute(request),
    )
  }

  protected abstract _execute(request: IRequest): MaybePromise<IResponse>
}
