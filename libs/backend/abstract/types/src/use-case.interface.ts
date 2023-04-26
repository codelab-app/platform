import type { IAuth0Owner } from '@codelab/frontend/abstract/core'

export abstract class IUseCase<IRequest = void, IResponse = void> {
  execute(request: IRequest): IResponse | Promise<IResponse> {
    console.log('Executing Use Case:', this.constructor, request)

    return this._execute(request)
  }

  protected abstract _execute(request: IRequest): IResponse | Promise<IResponse>
}

/**
 * For authenticated user
 */
export abstract class IAuthUseCase<IRequest = void, IResponse = void> {
  constructor(protected readonly owner: IAuth0Owner) {}

  execute(request: IRequest): IResponse | Promise<IResponse> {
    console.log('Executing Use Case:', this.constructor, request)

    return this._execute(request)
  }

  protected abstract _execute(request: IRequest): IResponse | Promise<IResponse>
}

export abstract class IAuthService {
  constructor(protected readonly owner: IAuth0Owner) {}
}
