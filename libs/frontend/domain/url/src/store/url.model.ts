import type { IUrlModel } from '@codelab/frontend/abstract/domain'
import type {
  UrlCreateInput,
  UrlUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IUrlDTO } from '@codelab/shared/abstract/core'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ id, url }: IUrlDTO) => new Url({ id, url })

@model('@codelab/Url')
export class Url
  extends Model({
    id: idProp,
    url: prop<string>(),
  })
  implements IUrlModel
{
  static create = create

  @modelAction
  writeCache({ id, url }: Partial<IUrlDTO>) {
    this.url = url ?? this.url

    return this
  }

  toCreateInput(): UrlCreateInput {
    return {
      id: this.id,
      url: this.url,
    }
  }

  toUpdateInput(): UrlUpdateInput {
    return {
      url: this.url,
    }
  }
}
