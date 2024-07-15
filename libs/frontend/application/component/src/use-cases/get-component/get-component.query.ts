import { execute, graphql } from '@codelab/frontend/infra/gql'
import { slugify } from '@codelab/shared/utils'

export const GetComponentQuery = graphql(`
  query GetComponent($options: ComponentOptions, $where: ComponentWhere) {
    components(options: $options, where: $where) {
      ...Component
    }
  }
`)

export const getComponentQuery = async ({
  name,
  username,
}: {
  name: string
  username: string
}) => {
  return execute(GetComponentQuery, {
    where: {
      compositeKey: `${username}-${slugify(name)}`,
    },
  })
}
