import { computed } from 'mobx'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'
import { TagFragment } from '../graphql/Tag.fragment.v2.1.graphql.gen'
import { INode } from './tree.service'

@model('codelab/Tag')
export class Tag
  extends Model({
    id: idProp,
    name: prop<string>(),
    children: prop<Array<string>>(),
  })
  implements INode
{
  @computed
  get label() {
    return this.name
  }

  static fromFragment(tag: TagFragment) {
    return new Tag({
      id: tag.id,
      name: tag.name,
      children: tag?.children?.map((child) => child.id),
    })
  }
}

export const tagRef = rootRef<Tag>('TagRef', {
  onResolvedValueChange(ref, newTag, oldTag) {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
