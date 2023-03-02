import type {
  IProp,
  IPropData,
  IPropService,
} from '@codelab/frontend/abstract/core'
import { IPropDTO } from '@codelab/frontend/abstract/core'
import {
  createContext,
  frozen,
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { Prop } from './prop.model'

@model('@codelab/PropService')
export class PropService
  extends Model({
    id: idProp,
    props: prop(() => objectMap<IProp>()),
  })
  implements IPropService
{
  prop(id: string) {
    return this.props.get(id)
  }

  @modelAction
  add({ id, data }: IPropDTO) {
    const propModel = Prop.create({ id, data })

    this.props.set(propModel.id, propModel)

    return propModel
  }
}

export const propServiceContext = createContext<IPropService>()

export const getPropService = (self: object) => {
  const propService = propServiceContext.get(self)

  if (!propService) {
    throw new Error('PropService context is not defined')
  }

  return propService
}
