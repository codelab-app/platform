import { TransactionManager } from '@codelab/backend/infra'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ERR_ABORTED } from 'dgraph-js-http'
import {
  concatMap,
  delay,
  finalize,
  map,
  mergeMap,
  Observable,
  of,
  retryWhen,
  take,
  throwError,
} from 'rxjs'

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(protected readonly transactionManager: TransactionManager) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp()
    let req = httpContext.getRequest()

    if (!req) {
      const ctx = GqlExecutionContext.create(context)

      req = ctx.getContext().req
    }

    req.transaction = await this.transactionManager.generateTransaction()

    return next.handle().pipe(
      map(async (r) => {
        await this.transactionManager.commitTransaction(req.transaction)

        return r
      }),
      retryWhen((errors) => {
        return errors.pipe(
          mergeMap((errorRes) => {
            // Retry if aborted
            if (errorRes === ERR_ABORTED) {
              return of(errorRes).pipe(
                delay(100), // Delay between retries
                take(5), // Number of retries
                concatMap(throwError), // Let the error bubble up again
              )
            }

            return throwError(errorRes)
          }),
        )
      }),
      finalize(async () => {
        await this.transactionManager.discardTransaction(req.transaction)
      }),
    )
  }
}
