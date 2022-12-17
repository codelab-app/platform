import type { IFieldResolver } from '@graphql-tools/utils'
import type { Transaction } from 'neo4j-driver'
import { getDriver } from './driver'

export type ITxnResolver<
  TParent = unknown,
  TContext = unknown,
  TArgs = Record<string, unknown>,
  TReturn = unknown,
> = IFieldResolver<
  TParent,
  TContext,
  TArgs,
  (txn: Transaction) => Promise<TReturn>
>

type TransactionWork<T> = (txn: Transaction) => Promise<T> | T

export const withReadTransaction = async <T>(
  readTransaction: TransactionWork<T>,
) => {
  const driver = getDriver()
  const session = driver.session()

  return session
    .readTransaction((txn) => readTransaction(txn))
    .catch((error) => {
      console.error(error)
      throw error
    })
    .finally(() => session.close())
}

export const withWriteTransaction = async <T>(
  writeTransaction: TransactionWork<T>,
) => {
  const driver = getDriver()
  const session = driver.session()

  return session
    .writeTransaction((txn) => writeTransaction(txn))
    .catch((error) => {
      console.error(error)
      throw error
    })
    .finally(() => session.close())
}

export const withReadTransactionResolver = <
  TParent = unknown,
  TArgs = Record<string, unknown>,
  TContext = Record<string, unknown>,
  TReturn = unknown,
>(
  txnResolver: ITxnResolver<TParent, TContext, TArgs, TReturn>,
) => {
  const resolver: IFieldResolver<TParent, TContext, TArgs, Promise<TReturn>> = (
    parent,
    args,
    context,
    info,
  ) => withReadTransaction(txnResolver(parent, args, context, info))

  return resolver
}

export const withWriteTransactionResolver = <
  TParent = unknown,
  TArgs = Record<string, unknown>,
  TContext = Record<string, unknown>,
  TReturn = unknown,
>(
  txnResolver: ITxnResolver<TParent, TContext, TArgs, TReturn>,
) => {
  const resolver: IFieldResolver<TParent, TContext, TArgs, Promise<TReturn>> = (
    parent,
    args,
    context,
    info,
  ) => withWriteTransaction(txnResolver(parent, args, context, info))

  return resolver
}
