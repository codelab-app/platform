import { IGraphQLResource } from './graphql-resource/graphql-resource.interface'
import { IRestResource } from './rest-resource/rest-resource.interface'

export type IResource = IGraphQLResource | IRestResource
