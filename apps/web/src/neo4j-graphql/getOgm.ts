import { OGM } from '@neo4j/graphql-ogm'
import { getDriver } from './getDriver'
import { ModelMap } from './ogm-types.gen'
import typeDefs from './typeDefs'

// Keep a single OGM instance if possible
let ogm: OGM<ModelMap>

export const getOgm = () => (ogm ??= new OGM({ typeDefs, driver: getDriver() }))
