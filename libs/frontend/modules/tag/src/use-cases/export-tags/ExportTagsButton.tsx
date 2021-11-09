import { Button } from 'antd'
import fileDownload from 'js-file-download'
import { useTagState } from '../../domain/use-tag/useTagState'
import { useLazyExportTagsQuery } from '../tag.endpoints'

/**
 * Export should only allow root components to be checked
 */
export const ExportTagsButton = () => {
  const { checkedTags } = useTagState()
  const [getExportTags, { data }] = useLazyExportTagsQuery()

  return (
    <Button
      onClick={() => {
        console.log('export tags', checkedTags)
        getExportTags({
          variables: {
            input: {
              where: {
                ids: checkedTags.map((tag) => tag.toString()),
              },
            },
          },
        })
        console.log(data)

        if (data) {
          const content = JSON.stringify(data.getTagGraphs)
          console.log(content)
          fileDownload(content, 'tags.json')
        }
      }}
    >
      Export Tags
    </Button>
  )
}
