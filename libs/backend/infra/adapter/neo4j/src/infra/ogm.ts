import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { OGM } from '@neo4j/graphql-ogm'
import { typeDefs } from '../schema'
import { getDriver } from './driver'

// Keep a single OGM instance if possible
let ogm: OGM<OGM_TYPES.ModelMap>

export const getOgm = async () => {
  if (!ogm) {
    ogm = new OGM({
      typeDefs,
      driver: getDriver(),
    })

    await ogm.init()
  }

  return ogm
}
