import type { IPropRepository } from '@codelab/frontend/abstract/application'
import type { IPropModel } from '@codelab/frontend/abstract/domain'
import type {
  PropOptions,
  PropUniqueWhere,
  PropWhere,
} from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { propApi } from './prop.api'

@model('@codelab/PropRepository')
export class PropRepository extends Model({}) implements IPropRepository {
  @modelFlow
  add = _async(function* (this: PropRepository, prop: IPropModel) {
    const {
      createProps: { props },
    } = yield* _await(
      propApi.CreateProps({
        input: [prop.toCreateInput()],
      }),
    )

    const createdProp = props[0]

    assertIsDefined(createdProp)

    return createdProp
  })

  @modelFlow
  delete = _async(function* (this: PropRepository, props: Array<IPropModel>) {
    const {
      deleteProps: { nodesDeleted },
    } = yield* _await(
      propApi.DeleteProps({
        where: { id_IN: props.map((prop) => prop.id) },
      }),
    )

    return nodesDeleted
  })

  @modelFlow
  find = _async(function* (
    this: PropRepository,
    where?: PropWhere,
    options?: PropOptions,
  ) {
    return yield* _await(propApi.GetProps({ options, where }))
  })

  @modelFlow
  findOne = _async(function* (this: PropRepository, where: PropUniqueWhere) {
    return (yield* _await(this.find(where))).items[0]
  })

  @modelFlow
  update = _async(function* (this: PropRepository, prop: IPropModel) {
    const {
      updateProps: { props },
    } = yield* _await(
      propApi.UpdateProps({
        update: prop.toUpdateInput(),
        where: { id: prop.id },
      }),
    )

    const updatedProp = props[0]

    return updatedProp
  })
}
