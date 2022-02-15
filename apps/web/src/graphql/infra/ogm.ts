import { OGM } from '@neo4j/graphql-ogm'
import { ModelMap } from '../ogm-types.gen'
import typeDefs from '../schema/typeDefs'
import { getDriver } from './driver'

// Keep a single OGM instance if possible
let ogm: OGM<ModelMap>

export const getOgm = () => (ogm ??= new OGM({ typeDefs, driver: getDriver() }))
