import type { IUseCase } from '@codelab/backend/abstract/types'
import { withActiveSpan } from '@codelab/backend/infra/adapter/otel'
import type { MaybePromise } from '@codelab/shared/abstract/types'

export abstract class UseCase<IRequest = void, IResponse = void>
  implements IUseCase<IRequest, IResponse>
{
  execute(request: IRequest): MaybePromise<IResponse> {
    return withActiveSpan<IResponse>(`${this.constructor.name}.execute()`, () =>
      // @ts-ignore
      this._execute(request),
    )
  }

  protected abstract _execute(request: IRequest): MaybePromise<IResponse>
}
