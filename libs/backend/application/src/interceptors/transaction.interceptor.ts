import { TransactionManager } from '@codelab/backend/infra'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ERR_ABORTED } from 'dgraph-js-http'
import { catchError, finalize, map, Observable } from 'rxjs'

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
      catchError(async (err) => {
        if (err === ERR_ABORTED) {
          // TODO handle retry
          throw err
        } else {
          throw err
        }
      }),
      finalize(async () => {
        await this.transactionManager.discardTransaction(req.transaction)
      }),
    )
  }
}
