import type { IAuth0Owner } from '@codelab/shared/abstract/core'
import { context, Exception, SpanStatusCode, trace } from '@opentelemetry/api'

export abstract class IUseCase<IRequest = void, IResponse = void> {
  protected tracer = trace.getTracer('cli-tracer')

  execute(request: IRequest): IResponse | Promise<IResponse> {
    const span = this.tracer.startSpan(`${this.constructor.name}.execute()`)
    const ctx = trace.setSpan(context.active(), span)

    try {
      const result = context.with(ctx, () => this._execute(request))

      // If _execute returns a promise, we want to end the span after the promise resolves.
      if (result instanceof Promise) {
        return result.finally(() => span.end())
      }

      span.end()

      return result
    } catch (error) {
      // If an error is thrown, record it in the span and re-throw.
      span.recordException(`${error}`)
      span.setStatus({ code: SpanStatusCode.ERROR })
      span.end()
      throw error
    }
  }

  protected abstract _execute(request: IRequest): IResponse | Promise<IResponse>
}

/**
 * For authenticated user
 */
export abstract class IAuthUseCase<
  IRequest = void,
  IResponse = void,
> extends IUseCase<IRequest, IResponse> {
  constructor(protected readonly owner: IAuth0Owner) {
    super()
  }
}

export abstract class IAuthService {
  constructor(protected readonly owner: IAuth0Owner) {}
}
