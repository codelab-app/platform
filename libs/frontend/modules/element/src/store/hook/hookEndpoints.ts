import { api as generatedApi } from '../../graphql/hook.endpoints.v2.graphql.gen'
import {
  onCreateHooks,
  onDeletedHooks,
  runGuards,
  updateGraphCache,
} from '../element'

export const hookApi = generatedApi.enhanceEndpoints({
  endpoints: {
    CreateHooks: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const hooks = data.createHooks.hooks

          dispatch(updateGraphCache(rootId, onCreateHooks(hooks)))
        })
      },
    },
    DeleteHooks: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const deletedIds = (input.variables?.where.id_IN ||
            []) as Array<string>

          dispatch(updateGraphCache(rootId, onDeletedHooks(deletedIds)))
        })
      },
    },
  },
})

export { generatedApi as hookEndpoints }

export const { useCreateHooksMutation, useDeleteHooksMutation } = generatedApi
