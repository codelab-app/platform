import type {
  ITagModel,
  ITagTreeService,
} from '@codelab/frontend/abstract/core'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { tagRef } from './tag.model'

const init = (tags: Array<ITagModel>) => {
  const tagTree = new TagTreeService({})

  tagTree.addRoots(tags)

  return tagTree
}

@model('@codelab/TagTreeService')
export class TagTreeService
  extends Model({
    /**
     * The list of nodes must be in order from leaf to root, since we'll need to create the children first for assigning children reference
     */
    roots: prop(() => objectMap<Ref<ITagModel>>()),
  })
  implements ITagTreeService
{
  static init = init

  @computed
  get antdTreeData() {
    return [...this.roots.values()].map((root) => root.current.antdNode)
  }

  @modelAction
  addRoots(tags: Array<ITagModel>) {
    tags.forEach((tag) => {
      if (tag.isRoot) {
        this.roots.set(tag.id, tagRef(tag.id))
      }
    })
  }
}
