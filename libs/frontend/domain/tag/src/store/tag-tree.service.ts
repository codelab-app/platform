import type { ITag, ITagTreeService } from '@codelab/frontend/abstract/core'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { tagRef } from './tag.model'

@model('@codelab/TagTreeService')
export class TagTreeService
  extends Model({
    /**
     * The list of nodes must be in order from leaf to root, since we'll need to create the children first for assigning children reference
     */
    roots: prop(() => objectMap<Ref<ITag>>()),
  })
  implements ITagTreeService
{
  static init(tags: Array<ITag>) {
    const tagTree = new TagTreeService({})

    tagTree.addRoots(tags)

    return tagTree
  }

  @modelAction
  addRoots(tags: Array<ITag>) {
    tags.forEach((tag) => {
      if (tag.isRoot) {
        this.roots.set(tag.id, tagRef(tag.id))
      }
    })
  }

  @computed
  get antdTreeData() {
    return [...this.roots.values()].map((root) => root.current.antdNode)
  }
}
