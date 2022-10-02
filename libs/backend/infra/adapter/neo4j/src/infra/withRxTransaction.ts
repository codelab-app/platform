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

type RxTransactionWork<T> = (tx: RxTransaction) => Observable<T>

export const withRxReadTransactions = async <T>(
  readTransaction: RxTransactionWork<T>,
) => {
  const driver = getDriver()
  const session = driver.rxSession()

  return session
    .readTransaction((txn) => readTransaction(txn))
    .toPromise()
    .catch((error) => {
      console.error(error)
      throw error
    })
    .finally(() => session.close())
}

export const withRxWriteTransactions = async <T>(
  writeTransaction: RxTransactionWork<T>,
) => {
  const driver = getDriver()
  const session = driver.rxSession()

  return session
    .writeTransaction((txn) => writeTransaction(txn))
    .toPromise()
    .catch((error) => {
      console.error(error)
      throw error
    })
    .finally(() => session.close())
}

export const withRxReadTransactionResolver = <
  TParent = any,
  TArgs = Record<string, any>,
  TContext = Record<string, any>,
  TReturn = any,
>(
  rxTxnResolver: IRxTxnResolver<TParent, TContext, TArgs, TReturn>,
) => {
  const resolver: IFieldResolver<TParent, TContext, TArgs, Promise<TReturn>> = (
    parent,
    args,
    context,
    info,
  ) => withRxReadTransactions(rxTxnResolver(parent, args, context, info))

  return resolver
}

export const withRxWriteTransactionResolver = <
  TParent = any,
  TArgs = Record<string, any>,
  TContext = Record<string, any>,
  TReturn = any,
>(
  rxTxnResolver: IRxTxnResolver<TParent, TContext, TArgs, TReturn>,
) => {
  const resolver: IFieldResolver<TParent, TContext, TArgs, Promise<TReturn>> = (
    parent,
    args,
    context,
    info,
  ) => withRxWriteTransactions(rxTxnResolver(parent, args, context, info))

  return resolver
}
