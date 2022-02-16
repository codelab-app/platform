import { OGM } from '@neo4j/graphql-ogm'
import { ModelMap } from '../ogm-types.gen'
import typeDefs from '../schema/typeDefs'
import { getDriver } from './driver'

// Since we're running in a serverless environment, we don't want to instantiate the ogm
// and all models on every request. By using functions and singleton instances we can instantiate only what we need
let ogm: OGM<ModelMap>

export const getOgm = () => (ogm ??= new OGM({ typeDefs, driver: getDriver() }))
