import { api as generatedApi } from '../graphql/admin.endpoints.graphql.gen'

export { generatedApi as adminEndpoints }
export const { useResetDataMutation, useSeedBaseTypesMutation } = generatedApi
