import { gql } from '@apollo/client'
import { __ResourceType } from '@codelab/shared/abstract/core'

const resourceTypeEnum = `enum ResourceType {
  ${Object.values(__ResourceType).join('\n')}
}`

export const resourceSchema = gql`
  ${resourceTypeEnum}

  type Resource implements WithOwner {
    id: ID! @unique
    type: ResourceType!
    name: String!
    config: Prop! @relationship(type: "RESOURCE_CONFIG", direction: OUT)
    owner: User!
  }
`
