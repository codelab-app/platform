import { execute, graphql } from '@codelab/frontend/infra/gql'

// export const GetAppQuery = graphql(`
//   query GetApp($appCompositeKey: String!, $pageName: String!) {
//     id
//     name
//   }
// `)

// export const getAppQuery = async ({ userSlug }: { userSlug: string }) => {
//   const variables = { userSlug: params.userSlug }

//   const data = await execute(GetAppQuery, {
//     where: {
//       compositeKey: `${userSlug}`,
//     },
//   })

//   return data
// }
