import type { Domain } from '@codelab/backend/abstract/codegen'

export const projectDomain = async ({ name }: Domain) => {
  return { verified: false }
}
