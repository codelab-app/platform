import { pureResolvers } from '@codelab/backend/pure-resolvers'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { OGM } from '@neo4j/graphql-ogm'
import { typeDefs } from '../schema'
import { getDriver } from './driver'

// Keep a single OGM instance
let ogm: OGM<OGM_TYPES.ModelMap> | undefined

export const getOgm = async () => {
  if (!ogm) {
    ogm = new OGM({
      typeDefs,
      resolvers: pureResolvers,
      driver: getDriver(),
      config: {
        enableRegex: true,
      },
    })
  }

  await ogm.init()

  return ogm
}
