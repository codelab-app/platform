import { map } from 'rxjs/operators'
import { tagRepository } from '../../repositories/tag'
import { IRxTxnResolver } from '../abstract/withRxTransaction'

export const tagGraphs: IRxTxnResolver = () => (txn) => {
  return tagRepository.getTagGraphs(txn).pipe(
    map((x) => {
      // console.log(x)

      return x
    }),
  )
}
