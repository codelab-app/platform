import type { ModelMap } from '@codelab/backend/abstract/codegen'
import { OGM } from '@neo4j/graphql-ogm'
import { pureResolvers } from '../resolver'
import { typeDefs } from '../schema'
import { getDriver } from './driver'

// Keep a single OGM instance
let ogm: OGM<ModelMap> | undefined

export const getOgm = async () => {
  if (!ogm) {
    ogm = new OGM({
      config: {
        enableRegex: true,
      },
      driver: getDriver(),
      resolvers: pureResolvers,
      typeDefs,
    })
  }

  await ogm.init()

  return ogm
}
