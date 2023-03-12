import type { ITag } from '@codelab/backend/abstract/core'
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

  return (await Tag.find({
    where: props.where,
    selectionSet: tagSelectionSet,
    options: {
      sort: [{ name: OGM_TYPES.SortDirection.Asc }],
    },
    selectionSet: tagSelectionSet,
  })) as Array<ITag>
}
