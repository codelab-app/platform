import { ITag, ITagDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'
import { INode } from './tree.service'

@model('codelab/Tag')
export class Tag
  extends Model({
    id: idProp,
    name: prop<string>(),
    children: prop<Array<string>>(),
  })
  implements INode, ITag
{
  @computed
  get label() {
    return this.name
  }

  static fromFragment(tag: ITagDTO) {
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
