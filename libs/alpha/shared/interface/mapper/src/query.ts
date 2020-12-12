import { ApolloQueryResult } from '@apollo/client'
import { Collection } from '@codelab/alpha/shared/interface/collections'

export type ApolloQueryMapper<
  TResults extends Partial<ApolloQueryResult<any>>,
  TRecord
> = (results: Partial<TResults>) => Collection<TRecord>
