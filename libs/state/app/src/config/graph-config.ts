import { map } from 'rxjs/operators'
import { assign } from 'xstate'
import { ActionsEntity, ServicesEntity } from '@codelab/shared/interface/entity'
import { CustomMachineOptions } from '@codelab/shared/interface/machine'
import { watchQuery } from '@codelab/shared/utils'
import { GraphsDocument } from '@codelab/state/apollo'
import { EventEntitySuccess, EventNameEntity } from '@codelab/state/entity'
import { getApolloClient } from '@codelab/ui/hoc'

export const graphConfig: CustomMachineOptions = {
  services: {
    [ServicesEntity.FETCH_LIST]: (context, event) => {
      return watchQuery(getApolloClient(), {
        query: GraphsDocument,
        context: {
          clientName: 'hasura',
        },
      }).pipe(
        map((value: any) => {
          const {
            data: { graph },
          } = value

          return {
            type: EventNameEntity.SUCCESS,
            data: graph,
          }
        }),
      )
    },
  },
  actions: {
    [ActionsEntity.ASSIGN_LIST]: assign({
      list: (context, event) => {
        const { data } = event as EventEntitySuccess<any>

        console.log(data)

        return data
      },
    }),
  },
}
