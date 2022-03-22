import { Maybe } from '@codelab/shared/abstract/types'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { GraphQLResolveInfo } from 'graphql'
import { RxSession, RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { getDriver } from '../../infra/driver'

const driver = getDriver()

export type IRxTxnResolver<
  TParent = any,
  TContext = any,
  TArgs = Record<string, any>,
  TReturn = any,
> = (
  parent: TParent,
  args: TArgs,
  context?: TContext,
  info?: GraphQLResolveInfo,
) => (txn: RxTransaction) => Observable<TReturn>

export const withRxTransaction = <
  TParent = any,
  TArgs = Record<string, any>,
  TContext = Record<string, any>,
  TReturn = any,
>(
  rxTxnResolver: IRxTxnResolver<TParent, TContext, TArgs, TReturn>,
) => {
  const name = rxTxnResolver.name || ''

  const resolver: IFieldResolver<TParent, TContext, TArgs, Promise<TReturn>> = (
    parent,
    args,
    context,
    info,
  ) => {
    const session = driver.rxSession()

    return session
      .writeTransaction(rxTxnResolver(parent, args, context, info))
      .toPromise()
      .catch((error) => {
        console.error(`${name ? name + ':' : ''}`, error)
        throw error
      })
      .finally(() => session.close())

    // return session
    //   .writeTransaction(rxTxnResolver(parent, args, context, info))
    //   .pipe(
    //     catchError((error) => {
    //       console.error(`${name ? name + ':' : ''}`, error)
    //       throw error
    //     }),
    //   )
    //   .subscribe(() => session.close())
  }

  return resolver
}
