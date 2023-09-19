import type { MaybePromise } from '@codelab/shared/abstract/types'

export interface IUseCase<IRequest = void, IResponse = void> {
  execute(request: IRequest): MaybePromise<IResponse>
}
