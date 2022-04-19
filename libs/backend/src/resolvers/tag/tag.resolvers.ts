import { map } from 'rxjs/operators'
import { tagRepository } from '../../repositories/tag'
import { IRxTxnResolver } from '../common/withRxTransaction'

export const tagGraphs: IRxTxnResolver = () => (txn) => {
  return tagRepository.getTagGraphs(txn).pipe(map((x) => x))
}
