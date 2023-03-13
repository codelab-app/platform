import type { IProp, IPropRepository } from '@codelab/frontend/abstract/core'
import type { AppWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { propApi } from './prop.api'

@model('@codelab/PropRepository')
export class PropRepository extends Model({}) implements IPropRepository {
  @modelFlow
  add = _async(function* (this: PropRepository, prop: IProp) {
    const {
      createProps: { props },
    } = yield* _await(
      propApi.CreateProps({
        input: [prop.toCreateInput()],
      }),
    )

    return props[0]!
  })

  @modelFlow
  update = _async(function* (this: PropRepository, prop: IProp) {
    const {
      updateProps: { props },
    } = yield* _await(
      propApi.UpdateProps({
        update: prop.toUpdateInput(),
        where: { id: prop.id },
      }),
    )

    return props[0]!
  })

  @modelFlow
  find = _async(function* (this: PropRepository, where: AppWhere) {
    const { props } = yield* _await(propApi.GetProps({ where }))

    return props
  })

  @modelFlow
  delete = _async(function* (this: PropRepository, props: Array<IProp>) {
    const {
      deleteProps: { nodesDeleted },
    } = yield* _await(
      propApi.DeleteProps({
        where: { id_IN: props.map((prop) => prop.id) },
      }),
    )

    return nodesDeleted
  })
}
