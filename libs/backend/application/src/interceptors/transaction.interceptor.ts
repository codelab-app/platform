import { TransactionManager } from '@codelab/backend/infra'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
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
    const req = httpContext.getRequest()

    req.transaction = await this.transactionManager.generateTransaction()

    return next.handle().pipe(
      map(async () => {
        await this.transactionManager.commitTransaction(req.transaction)
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
