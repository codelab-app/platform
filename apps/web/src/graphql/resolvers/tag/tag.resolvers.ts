import { map } from 'rxjs/operators'
import { TagGraph } from '../../ogm-types.gen'
import { tagRepository } from '../../repositories/tag'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../abstract/withRxTransaction'

export const tagGraphs: IRxTxnResolver = () => (txn) =>
  tagRepository.getTagsGraph(txn).pipe(map((r) => r))
