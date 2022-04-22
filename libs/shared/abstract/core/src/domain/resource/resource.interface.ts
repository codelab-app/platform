enum ResourceType {
  GraphQL,
  REST,
}

export interface IResource {
  /**
   * User will select a type using dropdown
   */
  type: ResourceType
  /**
   * We will hardcode the config instead of using interface since not many too maintain.
   */
  options: IGraphQLResource | IRESTResource
  /**
   * Place to store `options` configuration
   */
  config: JSON
}

export interface IGraphQLResource {
  type: ResourceType.GraphQL
  url: string
  headers: JSON
}

export interface IRESTResource {
  type: ResourceType.REST
  url: string
  cookies: string
}
