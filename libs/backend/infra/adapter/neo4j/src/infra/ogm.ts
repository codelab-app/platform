import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { OGM } from '@neo4j/graphql-ogm'
import { resolvers } from '../resolver'
import { typeDefs } from '../schema'
import { getDriver } from './driver'

// Keep a single OGM instance
let ogm: OGM<OGM_TYPES.ModelMap> | undefined

export const getOgm = async () => {
  if (!ogm) {
    ogm = new OGM({
      config: {
        enableRegex: true,
      },
      driver: getDriver(),
      resolvers,
      typeDefs,
    })
  }

  await ogm.init()

  return ogm
}
