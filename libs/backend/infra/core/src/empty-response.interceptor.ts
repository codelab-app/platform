import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common'
import type { Observable } from 'rxjs'

import { HttpStatus, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'

/**
 * Global interceptor that automatically returns 204 No Content
 * for endpoints that return undefined, null, or void.
 * This prevents JSON parsing errors on the client side.
 */
@Injectable()
export class EmptyResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        // If the response is undefined, null, or void
        if (data === undefined || data === null) {
          const response = context.switchToHttp().getResponse()

          // Set status to 204 No Content
          response.status(HttpStatus.NO_CONTENT)

          // Return undefined to ensure no body is sent
          return undefined
        }

        // Otherwise, return the data as-is
        return data
      }),
    )
  }
}
