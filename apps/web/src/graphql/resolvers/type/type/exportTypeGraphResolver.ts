import { map } from 'rxjs/operators'
import { typeRepository } from '../../../repositories'
import {
  IRxTxnResolver,
  withRxTransaction,
} from '../../abstract/withRxTransaction'

export interface ExportGraphArgs {
  typeId: string
}

const exportTypeGraph: IRxTxnResolver<ExportGraphArgs, string> =
  ({ typeId }) =>
  (txn) => {
    return typeRepository.getTypeGraph(txn, [typeId]).pipe(
      map((r) =>
        JSON.stringify({
          ...r,
          vertices: r?.vertices.map((t) => ({
            ...t,
            typeKind: (t as any).__resolveType, // change __resolveType to typeKind to match the IType interface
          })),
          rootId: typeId,
        }),
      ),
    )
  }

export const exportTypeGraphResolver = withRxTransaction<
  ExportGraphArgs,
  string
>(exportTypeGraph)

export default exportTypeGraphResolver
