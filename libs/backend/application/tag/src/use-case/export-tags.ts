import {
  exportTagSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

interface ExportTagsProps {
  where?: OGM_TYPES.TagWhere
}

export const exportTags = async (props: ExportTagsProps = {}) => {
  const Tag = await Repository.instance.Tag

  return (
    (
      await Tag.find({
        options: {
          sort: [{ name: OGM_TYPES.SortDirection.Asc }],
        },
        selectionSet: exportTagSelectionSet,
        where: props.where,
      })
    )
      // Sort children values
      .map((tag) => ({
        ...tag,
        children: tag.children.sort((a, b) => a.name.localeCompare(b.name)),
      }))
  )
}
