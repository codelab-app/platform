import { TagTree } from '@codelab/frontend/abstract/props'
import { TagEdgeFragment, TagFragment } from '@codelab/shared/codegen/graphql'
import { TreeAdapter } from '../tree/TreeAdapter'

export class TagGraphTreeAdapter
  extends TreeAdapter<TagFragment, TagEdgeFragment>
  implements TagTree<TagFragment>
{
  getPathFromRoot(nodeId: string): { found: boolean; path: Array<string> } {
    return { found: false, path: [] }
  }
}
