import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { neo4jgraphql } from 'neo4j-graphql-js'
import { Observable } from 'rxjs'

@Injectable()
export class Neo4JGraphQLInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(context)
    const ctx = GqlExecutionContext.create(context)

    console.log(ctx)

    return neo4jgraphql(
      ctx.getRoot(),
      ctx.getArgs(),
      ctx.getContext(),
      ctx.getInfo(),
    )
  }
}
