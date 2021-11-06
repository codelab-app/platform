import { api as generatedApi } from './admin.endpoints.graphql.gen'

export { generatedApi as adminEndpoints }
export const { useResetDataMutation, useSeedBaseTypesMutation } = generatedApi
