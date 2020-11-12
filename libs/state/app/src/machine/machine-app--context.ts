import { Interpreter } from 'xstate'
import { EventApp } from './machine-app--event'
import { StateSchemaApp } from './machine-app--state'
import {
  ContextEntity,
  EventEntity,
  StateSchemaEntity,
} from '@codelab/state/entity'
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
  app: Interpreter<ContextApp, StateSchemaApp, EventApp>
  vertex: Interpreter<ContextEntity, StateSchemaEntity, EventEntity>
  modal: Interpreter<ContextModal, StateSchemaModal, EventModal>
  layout: Interpreter<ContextLayout, StateSchemaLayout, EventLayout>
  node: Interpreter<ContextNode, StateSchemaNode, EventNode>
  graphQLDemo: Interpreter<any, any, any>
}
