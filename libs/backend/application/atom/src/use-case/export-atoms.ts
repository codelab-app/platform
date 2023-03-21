import {
  exportAtomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IAtomDTO } from '@codelab/frontend/abstract/core'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'

interface ExportAtomsProps {
  where?: OGM_TYPES.AtomWhere
}

export const exportAtoms = async (
  props: ExportAtomsProps = {},
): Promise<Array<IAtomDTO>> => {
  const Atom = await Repository.instance.Atom

  return (
    (
      await Atom.find({
        options: {
          sort: [{ name: OGM_TYPES.SortDirection.Asc }],
        },
        selectionSet: exportAtomSelectionSet,
        where: props.where,
      })
    )
      // Sort nested properties, since we can't do this with OGM
      .map((atom) => ({
        ...atom,
        allowedChildren: atom.allowedChildren.sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
        tags: atom.tags.map((tag) => ({
          ...tag,
          children: tag.children.sort((a, b) => a.name.localeCompare(b.name)),
        })),
      }))
  )
}
