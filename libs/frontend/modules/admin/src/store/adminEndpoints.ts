import { api as generatedApi } from '../graphql/Admin.endpoints.graphql.gen'

export { generatedApi as adminEndpoints }
export const { useResetDataMutation, useSeedBaseTypesMutation } = generatedApi
