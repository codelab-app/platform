import type { IAuth0Owner, ITagDTO } from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'

type PartialTagDTO = Partial<ITagDTO> & Pick<ITagDTO, 'name'>

const delete_table_tag_0_id = v4()
const delete_table_tag_0_0_id = v4()
const delete_tree_tag_0_id = v4()
const delete_tree_tag_0_0_id = v4()
const delete_tree_tag_1_id = v4()
const delete_tree_tag_1_0_id = v4()

export enum CreateData {
  // Parent
  tag_0 = 'Create-Tag-0',
  // Child
  tag_0_0 = 'Create-Tag-0-0',
}

export enum UpdateData {
  tag_0 = 'Update-Tag-0',
  updated_tag_0 = 'Updated-Tag-0',
}

export enum DeleteTableData {
  tag_0 = 'Delete-Tag-0',
  tag_0_0 = 'Delete-Tag-0-0',
  tag_0_1 = 'Delete-Tag-0-1',
}

export enum DeleteTreeData {
  tag_0 = 'Delete-Tree-Tag-0',
  tag_0_0 = 'Delete-Tree-Tag-0-0',
  tag_1 = 'Delete-Tree-Tag-1',
  tag_1_0 = 'Delete-Tree-Tag-1-0',
}

const partialTagData: Array<PartialTagDTO> = [
  { name: UpdateData['tag_0'] },
  {
    children: [{ id: delete_table_tag_0_0_id }],
    id: delete_table_tag_0_id,
    name: DeleteTableData['tag_0'],
  },
  {
    id: delete_table_tag_0_0_id,
    name: DeleteTableData['tag_0_0'],
    parent: { id: delete_table_tag_0_id },
  },
  { name: DeleteTableData['tag_0_1'] },
  {
    children: [{ id: delete_tree_tag_0_0_id }],
    id: delete_tree_tag_0_id,
    name: DeleteTreeData['tag_0'],
  },
  {
    id: delete_tree_tag_0_0_id,
    name: DeleteTreeData['tag_0_0'],
    parent: { id: delete_tree_tag_0_id },
  },
  {
    children: [{ id: delete_tree_tag_1_0_id }],
    id: delete_tree_tag_1_id,
    name: DeleteTreeData['tag_1'],
  },
  {
    id: delete_tree_tag_1_0_id,
    name: DeleteTreeData['tag_1_0'],
    parent: { id: delete_tree_tag_1_id },
  },
]

export const createTagsData = (owner: IAuth0Owner): Array<ITagDTO> =>
  partialTagData
    // add missing pieces
    .map(({ children, id, name, parent }) => ({
      children: children ?? [],
      id: id ?? v4(),
      name,
      owner,
      parent,
    }))
