import { map, toArray } from 'rxjs/operators'
import { QueryExportAllTypesGraphArgs } from '../../ogm-types.gen'
import { typeRepository } from '../../repositories'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../abstract/withRxTransaction'

const exportData: IRxTxnResolver<QueryExportAllTypesGraphArgs, any> =
  ({ input: { typeIds } }) =>
  (txn) =>
    typeRepository.getTypeGraph(txn, typeIds).pipe(
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

export const exportAllTypesGraph = withRxTransaction<
  QueryExportAllTypesGraphArgs,
  any
>(exportData)
