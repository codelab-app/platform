import {
  ICreatePreRenderDTO,
  IPreRender,
  IPreRenderDTO,
  IPreRenderService,
  IUpdatePreRenderDTO,
} from '@codelab/frontend/abstract/core'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { PreRenderWhere } from '@codelab/shared/abstract/codegen'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { mapCreateInput } from './api.utils'
import { preRenderApi } from './pre-render.api'
import { PreRender } from './pre-render.model'
import { PreRenderModalService } from './pre-render-modal.service'

/**
 * PreRender service will use ref from ElementService
 */
@model('@codelab/PreRenderService')
export class PreRenderService
  extends Model({
    preRenders: prop(() => objectMap<IPreRender>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new PreRenderModalService({})),
    deleteModal: prop(() => new PreRenderModalService({})),
  })
  implements IPreRenderService
{
  preRender(id: string) {
    return this.preRenders.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: PreRenderService, where?: PreRenderWhere) {
    const { preRenders } = yield* _await(preRenderApi.GetPreRenders({ where }))

    return preRenders
      .map((preRender) => {
        if (this.preRenders.get(preRender.id)) {
          return this.preRenders.get(preRender.id)
        } else {
          const preRenderModel = PreRender.hydrate(preRender)
          this.preRenders.set(preRender.id, preRenderModel)

          return preRenderModel
        }
      })
      .filter((preRender): preRender is PreRender => Boolean(preRender))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: PreRenderService, id: string) {
    if (this.preRenders.has(id)) {
      return this.preRenders.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: PreRenderService,
    data: Array<ICreatePreRenderDTO>,
  ) {
    const input = data.map((preRender) => mapCreateInput(preRender))

    const {
      createPreRenders: { preRenders },
    } = yield* _await(
      preRenderApi.CreatePreRenders({
        input,
      }),
    )

    if (!preRenders.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('PreRender was not created')
    }

    const preRender = preRenders[0]
    const preRenderModel = PreRender.hydrate(preRender)

    this.preRenders.set(preRender.id, preRenderModel)

    return [preRenderModel]
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: PreRenderService,
    preRender: IPreRender,
    { type, code, name }: IUpdatePreRenderDTO,
  ) {
    const { updatePreRenders } = yield* _await(
      preRenderApi.UpdatePreRenders({
        update: { code, type, name },
        where: { id: preRender.id },
      }),
    )

    if (!preRender) {
      throw new Error('Failed to update preRender')
    }

    preRender.writeCache(updatePreRenders.preRenders[0])

    return preRender
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: PreRenderService, id: string) {
    const existing = throwIfUndefined(this.preRenders.get(id))

    if (this.preRenders.has(id)) {
      this.preRenders.delete(id)
    }

    const { deletePreRenders } = yield* _await(
      preRenderApi.DeletePreRenders({
        where: { id },
      }),
    )

    if (deletePreRenders.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('PreRender was not deleted')
    }

    return existing
  })

  @modelAction
  writeCache(preRenderFragment: IPreRenderDTO) {
    let preRenderModel = this.preRender(preRenderFragment.id)

    if (preRenderModel) {
      preRenderModel.writeCache(preRenderFragment)
    } else {
      preRenderModel = PreRender.hydrate(preRenderFragment)
      this.preRenders.set(preRenderModel.id, preRenderModel)
    }

    return preRenderModel
  }
}
