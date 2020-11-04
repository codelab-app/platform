import { Interpreter } from 'xstate'
import {
  ContextLayout,
  EventLayout,
  StateSchemaLayout,
} from '@codelab/state/layout'
import {
  ContextModal,
  EventModal,
  StateSchemaModal,
} from '@codelab/state/modal'
import { ContextNode, EventNode, StateSchemaNode } from '@codelab/state/node'

export interface ContextApp {
  modal: Interpreter<ContextModal, StateSchemaModal, EventModal>
  layout: Interpreter<ContextLayout, StateSchemaLayout, EventLayout>
  node: Interpreter<ContextNode, StateSchemaNode, EventNode>
  graphQLDemo: Interpreter<any, any, any>
}
