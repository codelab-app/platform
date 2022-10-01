import { GraphqlDescriptionProps } from './types'

export const GraphqlDescription = ({ config }: GraphqlDescriptionProps) => {
  return (
    <span>
      {config.graphqlUrl} - {config.graphqlBody}
    </span>
  )
}
