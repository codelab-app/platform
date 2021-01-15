import { ServiceConfig } from 'xstate/lib/types'

export const editAppService: Record<string, ServiceConfig<any, any>> = {
  editApp: (context, { data }) => {
    return new Promise((resolve, reject) => setTimeout(resolve, 500))
    // TODO: connect it to the backend

    // return mutate(getApolloClient(), {
    //   mutation: DeleteAppGql,
    //   variables: { input: data },
    // })
  },
}
