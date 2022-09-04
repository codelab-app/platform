import { IRxTxnResolver } from '@codelab/backend/adapter/neo4j'
import { elementRepository } from '@codelab/backend/application'
import { QueryElementGraphArgs } from '@codelab/shared/abstract/codegen'

export const elementGraph: IRxTxnResolver<any, any, QueryElementGraphArgs> =
  (parent, args) => (txn) => {
    return elementRepository.getElementGraph(txn, args.input.rootId)
  }
