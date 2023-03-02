import type { IFieldResolver } from '@graphql-tools/utils'
import type { Transaction } from 'neo4j-driver'
import { getDriver } from './driver'

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
