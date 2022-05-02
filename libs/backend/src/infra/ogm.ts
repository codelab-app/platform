import { OGM } from '@neo4j/graphql-ogm'
import { typeDefs } from '../schema'
import { getDriver } from './driver'
import { ModelMap } from './ogm-types.gen'

// Keep a single OGM instance if possible
let ogm: OGM<ModelMap>

export const getOgm = async () => {
  if (!ogm) {
    ogm = new OGM({ typeDefs, driver: getDriver() })
    await ogm.init()
  }

  return ogm
}
