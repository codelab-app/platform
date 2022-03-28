import { idProp, Model, model, prop } from 'mobx-keystone'
import { TagFragment } from '../graphql/Tag.fragment.v2.1.graphql.gen'

@model('codelab/Tag')
export class Tag extends Model({
  id: idProp,
  name: prop<string>(),
}) {
  static fromFragment(tag: TagFragment) {
    return new Tag({
      id: tag.id,
      name: tag.name,
    })
  }
}
