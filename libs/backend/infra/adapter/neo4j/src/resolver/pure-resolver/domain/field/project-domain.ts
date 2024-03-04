import type { Domain } from '@codelab/backend/abstract/codegen'

export const projectDomain = async ({ name }: Domain) => {
  return { verified: false }

  // const res = await vercelApis.domain.getProjectDomain(name)

  // // await handleAPIError(res, 'getProjectDomain - vercel')
  // if (!res.ok) {
  //   return { verified: false }
  // }

  // return await res.json()
}
