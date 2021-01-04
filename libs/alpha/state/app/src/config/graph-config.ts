import { map } from 'rxjs/operators'
import { assign } from 'xstate'
import { queryToCollection } from '@codelab/alpha/shared/factory'
import { ActionsEntity, ServicesEntity } from '@codelab/alpha/shared/interface/entity'
import { CustomMachineOptions } from '@codelab/alpha/shared/interface/machine'
import { watchQuery } from '@codelab/alpha/shared/utils'
import { GraphsDocument, GraphsQueryResult } from '@codelab/alpha/state/apollo'
import { EventEntitySuccess, EventNameEntity } from '@codelab/alpha/state/entity'
import { getApolloClient } from '@codelab/alpha/ui/hoc'

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
