import { Button } from 'antd'
import { useTagState } from '../../domain/use-tag/useTagState'
import { useExportTagsLazyQuery } from './ExportTags.web.graphql.gen'

/**
 * Export should only allow root components to be checked
 */
export const ExportTagsButton = () => {
  const { checkedTags } = useTagState()
  const [getExportTags, { data }] = useExportTagsLazyQuery()
  console.log(checkedTags)

  return (
    <Button
      onClick={() => {
        getExportTags({
          variables: {
            input: {
              where: {
                ids: checkedTags.map((tag) => tag.toString()),
              },
            },
          },
        })
      }}
    >
      Export Tags
    </Button>
  )
}
