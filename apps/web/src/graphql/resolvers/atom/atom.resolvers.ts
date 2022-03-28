import { AtomFragment } from '@codelab/frontend/modules/atom'
import { map } from 'rxjs/operators'
import { atomRepository } from '../../repositories/atom'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../abstract/withRxTransaction'

export const exportAtom: IRxTxnResolver = () => (txn) =>
  atomRepository.exportAtom(txn).pipe(map((r) => r))
