import { ArgumentsHost, Catch } from '@nestjs/common'
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-errors'

@Catch(ApolloError)
export class GraphErrorHandler implements GqlExceptionFilter {
  catch(exception: ApolloError, host: ArgumentsHost): any {
    const gqlHost: GqlArgumentsHost = GqlArgumentsHost.create(host)
    const err = exception

    return exception
  }
}
