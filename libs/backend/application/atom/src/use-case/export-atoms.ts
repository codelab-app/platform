import type { AtomWhere } from '@codelab/backend/abstract/codegen'
import { SortDirection } from '@codelab/backend/abstract/codegen'
import {
  exportAtomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IAtomDTO } from '@codelab/shared/abstract/core'

interface ExportAtomsProps {
  where?: AtomWhere
}

export const exportAtoms = async (
  props: ExportAtomsProps = {},
): Promise<Array<IAtomDTO>> => {
  const Atom = await Repository.instance.Atom

  return (
    (
      await Atom.find({
        options: {
          sort: [{ name: SortDirection.Asc }],
        },
        selectionSet: exportAtomSelectionSet,
        where: props.where,
      })
    )
      // Sort nested properties, since we can't do this with OGM
      .map((atom) => ({
        ...atom,
        suggestedChildren: atom.suggestedChildren.sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
        tags: atom.tags.map((tag) => ({
          ...tag,
          children: tag.children.sort((a, b) => a.name.localeCompare(b.name)),
        })),
      }))
  )
}
