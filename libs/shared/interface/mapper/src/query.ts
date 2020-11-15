import { ApolloQueryResult } from '@apollo/client'
import { Collection } from '@codelab/shared/interface/collections'

export type ApolloQueryMapper<
  TResults extends Partial<ApolloQueryResult<any>>,
  TRecord
> = (results: Partial<TResults>) => Collection<TRecord>
