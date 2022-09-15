import { IFieldResolver } from '@graphql-tools/utils'
import { Transaction } from 'neo4j-driver'
import { getDriver } from './driver'

export type ITxnResolver<
  TParent = any,
  TContext = any,
  TArgs = Record<string, any>,
  TReturn = any,
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
  TParent = any,
  TArgs = Record<string, any>,
  TContext = Record<string, any>,
  TReturn = any,
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
  TParent = any,
  TArgs = Record<string, any>,
  TContext = Record<string, any>,
  TReturn = any,
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
