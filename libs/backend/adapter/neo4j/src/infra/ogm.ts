import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { OGM } from '@neo4j/graphql-ogm'
import { typeDefs } from '../schema'
import { getDriver } from './driver'

// Keep a single OGM instance if possible
let ogm: OGM<OGM_TYPES.ModelMap>

export const getOgm = async ({
  reinitialize = false,
}: {
  reinitialize?: boolean
}) => {
  // Re-create ogm if we want to re-initialize
  if (!ogm || reinitialize) {
    ogm = new OGM({
      typeDefs,
      driver: getDriver(),
    })
    await ogm.init()
  }

  return ogm
}
