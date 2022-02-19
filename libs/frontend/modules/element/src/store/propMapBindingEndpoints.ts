import { api as generatedApi } from '../graphql/prop-map-binding.endpoints.v2.graphql.gen'
import { updateCache } from './elementEndpoints.v2'
import {
  onCreatePropMapBindings,
  onDeletedPropMapBindings,
  onUpdatePropMapBindings,
  runGuards,
} from './elementEndpoints.v2/utils'

export const propMapBindingApi = generatedApi.enhanceEndpoints({
  endpoints: {
    CreatePropMapBindings: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const propMapBindings = data.createPropMapBindings.propMapBindings

          dispatch(
            updateCache(rootId, onCreatePropMapBindings(propMapBindings)),
          )
        })
      },
    },
    DeletePropMapBindings: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const deletedIds = (input.variables?.where.id_IN ||
            []) as Array<string>

          dispatch(updateCache(rootId, onDeletedPropMapBindings(deletedIds)))
        })
      },
    },
    UpdatePropMapBindings: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const propMapBindings = data.updatePropMapBindings.propMapBindings

          dispatch(
            updateCache(rootId, onUpdatePropMapBindings(propMapBindings)),
          )
        })
      },
    },
  },
})

export { generatedApi as propMapBindingEndpoints }

export const {
  useCreatePropMapBindingsMutation,
  useUpdatePropMapBindingsMutation,
  useDeletePropMapBindingsMutation,
  useGetPropMapBindingsQuery,
} = generatedApi
