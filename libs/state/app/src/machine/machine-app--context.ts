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
  modal: null | (() => Interpreter<ContextModal, StateSchemaModal, EventModal>)
  layout:
    | null
    | (() => Interpreter<ContextLayout, StateSchemaLayout, EventLayout>)
  node: null | (() => Interpreter<ContextNode, StateSchemaNode, EventNode>)
}
