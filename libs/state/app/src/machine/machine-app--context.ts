import { Interpreter } from 'xstate'
import { EventApp } from './machine-app--event'
import { StateSchemaApp } from './machine-app--state'
import { NodeService } from '@codelab/core/node'
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
  app: null | (() => Interpreter<ContextApp, StateSchemaApp, EventApp>)
  modal: null | (() => Interpreter<ContextModal, StateSchemaModal, EventModal>)
  layout:
    | null
    | (() => Interpreter<ContextLayout, StateSchemaLayout, EventLayout>)
  node:
    | null
    | ((
        ctx: ContextApp,
      ) => Interpreter<ContextNode, StateSchemaNode, EventNode>)
  nodeService: NodeService
}
