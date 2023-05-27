import type { IAuth0Owner } from '@codelab/shared/abstract/core'
import { UseCase } from './use-case'

/**
 * For authenticated user
 */
export abstract class AuthUseCase<
  IRequest = void,
  IResponse = void,
> extends UseCase<IRequest, IResponse> {
  constructor(protected readonly owner: IAuth0Owner) {
    super()
  }
}

export abstract class AuthService {
  constructor(protected readonly owner: IAuth0Owner) {}
}
