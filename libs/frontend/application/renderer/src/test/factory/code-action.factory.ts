import { IActionKind, type ICodeActionDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { rootStore as testRootStore } from '../setup'

export default Factory.define<ICodeActionDTO>(({ params }) => {
  const dto: ICodeActionDTO = {
    __typename: IActionKind.CodeAction as 'CodeAction',
    code: `function run() {
      console.log('hello from code action factory');
    }`,
    id: params.id ?? v4(),
    name: params.name ?? 'renderPropType',
    store: { id: params.store?.id ?? v4() },
  }

  const model = testRootStore.actionService.add.bind(
    testRootStore.actionService,
  )(dto)

  console.log('model here', model)
  testRootStore.actionService.actions.set(dto.id, model)

  return dto
})
