import { map } from 'rxjs/operators'
import { atomRepository } from '../../repositories/atom'
import { IRxTxnResolver } from '../abstract/withRxTransaction'

export const exportAtom: IRxTxnResolver = () => (txn) =>
  atomRepository.getAtom(txn).pipe(map((r) => r))
