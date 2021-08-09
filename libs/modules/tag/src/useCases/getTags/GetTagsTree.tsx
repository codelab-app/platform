import { useGetTagsQuery } from '@codelab/codegen/graphql'

export const GetTagsTree = () => {
  const { data, loading } = useGetTagsQuery()

  console.log(data)

  return null
}
