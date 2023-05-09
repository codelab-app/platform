import type { TagWhere } from '@codelab/backend/abstract/codegen'
import { SortDirection } from '@codelab/backend/abstract/codegen'
import {
  exportTagSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'

interface ExportTagsProps {
  where?: TagWhere
}

export const exportTags = async (props: ExportTagsProps = {}) => {
  const Tag = await Repository.instance.Tag

  return (
    (
      await Tag.find({
        options: {
          sort: [{ name: SortDirection.Asc }],
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
