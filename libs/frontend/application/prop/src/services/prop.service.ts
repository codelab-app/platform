import type { IPropService } from '@codelab/frontend/abstract/application'
import type { IPropModel } from '@codelab/frontend/abstract/domain'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import type {
  IPropData,
  IUpdatePropData,
  IUpdatePropDataWithDefaultValues,
} from '@codelab/shared/abstract/core'
import { filterEmptyStrings } from '@codelab/shared/utils'
import {
  _async,
  _await,
  idProp,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { PropRepository } from './prop.repo'

@model('@codelab/PropService')
export class PropService
  extends Model({
    id: idProp,
    propRepository: prop(() => new PropRepository({})),
  })
  implements IPropService
{
  @modelFlow
  @transaction
  create = _async(function* (this: PropService, props: IPropModel) {
    yield* _await(this.propRepository.add(props))

    return props
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: PropService, props: Array<IPropModel>) {
    yield* _await(this.propRepository.delete(props))

    return
  })

  @modelFlow
  @transaction
  reset = _async(function* (this: PropService, props: IPropModel) {
    props.writeCache({ data: '{}' })

    yield* _await(this.propRepository.update(props))

    return props
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: PropService,
    props: IPropModel,
    data: IUpdatePropData,
  ) {
    props.writeCache(data)

    yield* _await(this.propRepository.update(props))

    return props
  })

  @modelFlow
  @transaction
  updateWithDefaultValuesApplied = _async(function* (
    this: PropService,
    props: IPropModel,
    { data, defaultValues, id }: IUpdatePropDataWithDefaultValues,
  ) {
    const filteredData = filterEmptyStrings(data) as IPropData
    const mergedWithDefaultValues = mergeProps(defaultValues, filteredData)

    return yield* _await(
      this.update(props, { data: JSON.stringify(mergedWithDefaultValues), id }),
    )
  })

  // @modelAction
  // add({ api, data, id }: IPropDTO) {
  //   console.debug('propService.add()', { api, data, id })

  //   let props = this.prop(id)

  //   if (props) {
  //     props.writeCache({ api, data })
  //   } else {
  //     props = Prop.create({ api, data, id })
  //     this.props.set(props.id, props)
  //   }

  //   return props
  // }

  // prop(id: string) {
  //   return this.props.get(id)
  // }
}
