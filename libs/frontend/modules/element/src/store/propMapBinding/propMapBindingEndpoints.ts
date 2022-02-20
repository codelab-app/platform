import { api as generatedApi } from '../../graphql/prop-map-binding.endpoints.v2.graphql.gen'
import {
  onCreatePropMapBindings,
  onDeletedPropMapBindings,
  onUpdatePropMapBindings,
  runGuards,
  updateGraphCache,
} from '../element'

export const propMapBindingApi = generatedApi.enhanceEndpoints({
  endpoints: {
    CreatePropMapBindings: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const propMapBindings = data.createPropMapBindings.propMapBindings

          dispatch(
            updateGraphCache(rootId, onCreatePropMapBindings(propMapBindings)),
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

          dispatch(
            updateGraphCache(rootId, onDeletedPropMapBindings(deletedIds)),
          )
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
            updateGraphCache(rootId, onUpdatePropMapBindings(propMapBindings)),
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
