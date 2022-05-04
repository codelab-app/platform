import { IGraphQLTagNode, ITag, ITagDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { detach, idProp, Model, model, prop, rootRef } from 'mobx-keystone'

@model('@codelab/Tag')
export class Tag
  extends Model({
    id: idProp,
    name: prop<string>(),
    children: prop<Array<string>>(),
  })
  implements IGraphQLTagNode, ITag
{
  @computed
  get label() {
    return this.name
  }

  static hydrate(tag: ITagDTO) {
    return new Tag({
      id: tag.id,
      name: tag.name,
      children: tag?.children?.map((child) => child.id),
    })
  }
}

export const tagRef = rootRef<Tag>('@codelab/TagRef', {
  onResolvedValueChange(ref, newTag, oldTag) {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
