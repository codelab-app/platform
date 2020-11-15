import { map } from 'rxjs/operators'
import { assign } from 'xstate'
import { queryToCollection } from '@codelab/shared/factory'
import { ActionsEntity, ServicesEntity } from '@codelab/shared/interface/entity'
import { CustomMachineOptions } from '@codelab/shared/interface/machine'
import { watchQuery } from '@codelab/shared/utils'
import { GraphsDocument, GraphsQueryResult } from '@codelab/state/apollo'
import { EventEntitySuccess, EventNameEntity } from '@codelab/state/entity'
import { getApolloClient } from '@codelab/ui/hoc'

export const graphConfig: CustomMachineOptions = {
  services: {
    [ServicesEntity.FETCH_LIST]: (context, event) =>
      watchQuery<GraphsQueryResult>(getApolloClient(), {
        query: GraphsDocument,
        context: {
          clientName: 'hasura',
        },
      }).pipe(
        map((results) => ({
          type: EventNameEntity.SUCCESS,
          results,
        })),
      ),
  },
  actions: {
    [ActionsEntity.ASSIGN_LIST]: assign({
      list: (context, event: EventEntitySuccess<GraphsQueryResult>) => {
        const { results, type } = event

        return queryToCollection(results)
      },
    }),
  },
}
