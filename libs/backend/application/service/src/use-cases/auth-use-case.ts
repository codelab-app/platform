import type { IAuth0User } from '@codelab/shared/abstract/core'
import { UseCase } from './use-case'

/**
 * For authenticated user
 */
export abstract class AuthUseCase<
  IRequest = void,
  IResponse = void,
> extends UseCase<IRequest, IResponse> {
  constructor(protected readonly owner: IAuth0User) {
    super()
  }
}

export abstract class IAuthService {
  constructor(readonly owner: IAuth0User) {}
}
