import type { IAuth0Owner, ITagDTO } from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'

type PartialTagDTO = Partial<ITagDTO> & Pick<ITagDTO, 'name'>

const delete_table_tag_0_id = v4()
const delete_table_tag_0_0_id = v4()
const delete_tree_tag_0_id = v4()
const delete_tree_tag_0_0_id = v4()
const delete_tree_tag_1_id = v4()
const delete_tree_tag_1_0_id = v4()

// Will be created by UI
export const createData: Record<string, PartialTagDTO> = {
  // Parent
  tag_0: {
    name: 'Create-Tag-0',
  },
  // Child
  tag_0_0: {
    name: 'Create-Tag-0-0',
  },
}

export const updateData: Record<string, PartialTagDTO> = {
  tag_0: { name: 'Update-Tag-0' },
  // Will be updated by UI
  updated_tag_0: { name: 'Updated-Tag-0' },
}

export const deleteData: Record<string, Record<string, PartialTagDTO>> = {
  table: {
    // parent of tag_0_0
    tag_0: {
      children: [{ id: delete_table_tag_0_0_id }],
      id: delete_table_tag_0_id,
      name: 'Delete-Tag-0',
    },
    tag_0_0: {
      id: delete_table_tag_0_0_id,
      name: 'Delete-Tag-0-0',
      parent: { id: delete_table_tag_0_id },
    },
    tag_0_1: { name: 'Delete-Tag-0-1' },
  },
  tree: {
    // parent of tag_0_0
    tag_0: {
      children: [{ id: delete_tree_tag_0_0_id }],
      id: delete_tree_tag_0_id,
      name: 'Delete-Tree-Tag-0',
    },
    tag_0_0: {
      id: delete_tree_tag_0_0_id,
      name: 'Delete-Tree-Tag-0-0',
      parent: { id: delete_tree_tag_0_id },
    },
    // parent of tag_1_0
    tag_1: {
      children: [{ id: delete_tree_tag_1_0_id }],
      id: delete_tree_tag_1_id,
      name: 'Delete-Tree-Tag-1',
    },
    tag_1_0: {
      id: delete_tree_tag_1_0_id,
      name: 'Delete-Tree-Tag-1-0',
      parent: { id: delete_tree_tag_1_id },
    },
  },
}

export const createTagsData = (owner: IAuth0Owner): Array<ITagDTO> =>
  [
    updateData['tag_0']!,
    ...Object.values(deleteData['table']!),
    ...Object.values(deleteData['tree']!),
  ].map(({ children, id, name, parent }) => ({
    children: children ?? [],
    id: id ?? v4(),
    name,
    owner,
    parent,
  }))
