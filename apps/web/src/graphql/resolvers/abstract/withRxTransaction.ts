import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { getDriver } from '../../infra/driver'

const driver = getDriver()

export type IRxTxnResolver<TIn, TOut> = (
  input: TIn,
) => (txn: RxTransaction) => Observable<TOut>

export const withRxTransaction = <TIn, TOut>(
  innerResolver: IRxTxnResolver<TIn, TOut>,
) => {
  const name = innerResolver.name || ''

  const resolver: IFieldResolver<any, any, TIn> = (_, input) => {
    const session = driver.rxSession()

    return session
      .writeTransaction(innerResolver(input))
      .toPromise()
      .catch((error) => {
        console.error(`${name ? name + ':' : ''}`, error)
        throw error
      })
      .finally(() => session.close())
  }

  return resolver
}
