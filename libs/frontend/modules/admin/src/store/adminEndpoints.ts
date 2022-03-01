import { api as generatedApi } from '../graphql/Admin.endpoints.v2.graphql.gen'

export { generatedApi as adminEndpoints }

export const {
  useResetDataMutation,
  // useSeedBaseTypesMutation,
  // useExecuteCommandMutation,
} = generatedApi
