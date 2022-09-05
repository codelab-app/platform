import { IFieldResolver } from '@graphql-tools/utils'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { getDriver } from './driver'

export type IRxTxnResolver<
  TParent = any,
  TContext = any,
  TArgs = Record<string, any>,
  TReturn = any,
> = IFieldResolver<
  TParent,
  TContext,
  TArgs,
  (txn: RxTransaction) => Observable<TReturn>
>

export const withRxWriteTransaction = <
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
    const driver = getDriver()
    const session = driver.rxSession()

    return session
      .writeTransaction(rxTxnResolver(parent, args, context, info))
      .toPromise()
      .catch((error) => {
        console.error(`${name ? name + ':' : ''}`, error)
        throw error
      })
      .finally(() => session.close())
  }

  return resolver
}

export const withRxReadTransaction = <
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
    const driver = getDriver()
    const session = driver.rxSession()

    return session
      .readTransaction(rxTxnResolver(parent, args, context, info))
      .toPromise()
      .catch((error) => {
        console.error(`${name ? name + ':' : ''}`, error)
        throw error
      })
      .finally(() => session.close())
  }

  return resolver
}
