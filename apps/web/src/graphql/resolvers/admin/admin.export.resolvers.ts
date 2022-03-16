import { map, toArray } from 'rxjs/operators'
import { typeRepository } from '../../repositories'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../abstract/withRxTransaction'

const exportData: IRxTxnResolver<void, any> = () => (txn) =>
  typeRepository.getAllTypesGraph(txn).pipe(
    map((r, i) => ({
      ...r,
      vertices: r?.vertices.map((t) => ({
        ...t,
        typeKind: (t as any).__resolveType, // change __resolveType to typeKind to match the IType interface
      })),
      // rootId: typeId,
    })),
    toArray(),
  )

export const exportAllTypesGraph = withRxTransaction<void, any>(exportData)
