import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { Transaction } from 'neo4j-driver'
import { getDriver } from './driver'

export type IAsyncTxnResolver<
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

export const withAsyncReadTransaction = <
  TParent = any,
  TArgs = Record<string, any>,
  TContext = Record<string, any>,
  TReturn = any,
>(
  asyncTxnResolver: IAsyncTxnResolver<TParent, TContext, TArgs, TReturn>,
) => {
  const name = asyncTxnResolver.name || ''

  const resolver: IFieldResolver<TParent, TContext, TArgs, Promise<TReturn>> = (
    parent,
    args,
    context,
    info,
  ) => {
    const driver = getDriver()
    const session = driver.session()

    return session
      .writeTransaction(asyncTxnResolver(parent, args, context, info))
      .catch((error) => {
        console.error(`${name ? name + ':' : ''}`, error)
        throw error
      })
      .finally(() => session.close())
  }

  return resolver
}
