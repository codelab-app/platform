import type { ITagDto } from '@codelab/shared/abstract/core'

import { v4 } from 'uuid'

const delete_table_tag_0_id = v4()
const delete_table_tag_0_0_id = v4()
const delete_tree_tag_0_id = v4()
const delete_tree_tag_0_0_id = v4()
const delete_tree_tag_0_0_0_id = v4()
const delete_tree_tag_1_id = v4()
const delete_tree_tag_1_0_id = v4()

export enum CreateData {
  // Parent
  tag_0 = 'Tag-0',
  // Child
  tag_0_0 = 'Tag-0-0',
  tag_1 = 'Tag-1',
  tag_1_0 = 'Tag-1-0',
}

export enum UpdateData {
  tag_0 = 'Updated-Tag-0',
}

export enum DeleteTreeData {
  tag_0 = 'Delete-Tree-Tag-0',
  tag_0_0 = 'Delete-Tree-Tag-0-0',
  tag_0_0_0 = 'Delete-Tree-Tag-0-0-0',
  tag_1 = 'Delete-Tree-Tag-1',
  tag_1_0 = 'Delete-Tree-Tag-1-0',
}

/**
 * Order in a way such that they can be connected
 */
export const createTagsData: Array<Omit<ITagDto, 'owner'>> = [
  {
    id: delete_tree_tag_0_0_0_id,
    name: DeleteTreeData['tag_0_0_0'],
  },
  {
    children: [{ id: delete_tree_tag_0_0_0_id }],
    id: delete_tree_tag_0_0_id,
    name: DeleteTreeData['tag_0_0'],
  },
  {
    children: [{ id: delete_tree_tag_0_0_id }],
    id: delete_tree_tag_0_id,
    name: DeleteTreeData['tag_0'],
  },
  {
    id: delete_tree_tag_1_0_id,
    name: DeleteTreeData['tag_1_0'],
  },
  {
    children: [{ id: delete_tree_tag_1_0_id }],
    id: delete_tree_tag_1_id,
    name: DeleteTreeData['tag_1'],
  },
]
