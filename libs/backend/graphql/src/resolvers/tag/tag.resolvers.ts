import { IRxTxnResolver } from '@codelab/backend/adapter/neo4j'
import { tagRepository } from '@codelab/backend/application'
import { map } from 'rxjs/operators'

export const tagGraphs: IRxTxnResolver = () => (txn) => {
  return tagRepository.getTagGraphs(txn).pipe(map((x) => x))
}
