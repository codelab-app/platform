import { Button } from 'antd'
import fileDownload from 'js-file-download'
import { useTagState } from '../../hooks'
import { useLazyExportTagsQuery } from '../../store'

/**
 * Export should only allow root components to be checked
 */
export const ExportTagsButton = () => {
  const { checkedTags } = useTagState()
  const [getExportTags, { data }] = useLazyExportTagsQuery()

  const onClick = () => {
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

    if (data) {
      const content = JSON.stringify(data.getTagGraphs)
      console.log(content)
      fileDownload(content, 'tags.json')
    }
  }

  return <Button onClick={onClick}>Export Tags</Button>
}
