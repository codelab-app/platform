import { ApolloQueryResult } from '@apollo/client'
import { DataDocument } from 'ts-japi'

export type ApolloQueryMapper<
  TResults extends Partial<ApolloQueryResult<any>>,
  TRecord
> = (results: Partial<TResults>) => DataDocument<TRecord>
