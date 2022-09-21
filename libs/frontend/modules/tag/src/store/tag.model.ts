import { ITag, ITagDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const hydrate = (tag: ITagDTO) => {
  return new Tag({
    id: tag.id,
    name: tag.name,
    children: tag?.children?.map((child) => child.id),
  })
}

@model('@codelab/Tag')
export class Tag
  extends Model({
    id: idProp,
    name: prop<string>(),
    children: prop<Array<string>>(() => []),
  })
  implements ITag
{
  @computed
  get label() {
    return this.name
  }

  static hydrate = hydrate

  @modelAction
  writeCache(tag: ITagDTO) {
    this.name = tag.name
    this.children = tag?.children?.map((child) => child.id) ?? []

    return this
  }
}

export const tagRef = rootRef<Tag>('@codelab/TagRef', {
  onResolvedValueChange(ref, newTag, oldTag) {
    if (oldTag && !newTag) {
      detach(ref)
    }
  },
})
