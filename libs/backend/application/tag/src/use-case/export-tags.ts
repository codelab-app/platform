import {
  Repository,
  tagSelectionSet,
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
        where: props.where,
        selectionSet: tagSelectionSet,
        options: {
          sort: [{ name: OGM_TYPES.SortDirection.Asc }],
        },
      })
    )
      // Sort children values
      .map((tag) => ({
        ...tag,
        children: tag.children.sort((a, b) => a.id.localeCompare(b.id)),
      }))
  )
}
