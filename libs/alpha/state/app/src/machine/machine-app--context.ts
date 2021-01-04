import { Interpreter } from 'xstate'
import { EventApp } from './machine-app--event'
import { StateSchemaApp } from './machine-app--state'
import {
  GraphA,
  GraphI,
  VertexA,
  VertexI,
} from '@codelab/alpha/shared/interface/graph-v2'
import {
  ContextEntity,
  EventEntity,
  StateSchemaEntity,
} from '@codelab/alpha/state/entity'
import {
  ContextLayout,
  EventLayout,
  StateSchemaLayout,
} from '@codelab/alpha/state/layout'
import {
  ContextModal,
  EventModal,
  StateSchemaModal,
} from '@codelab/alpha/state/modal'
import { ContextNode, EventNode, StateSchemaNode } from '@codelab/alpha/state/node'

export interface ContextApp {
  app: Interpreter<ContextApp, StateSchemaApp, EventApp>
  vertex: Interpreter<
    ContextEntity<VertexI, VertexA>,
    StateSchemaEntity<VertexI, VertexA>,
    EventEntity<VertexI, VertexA>
  >
  graph: Interpreter<
    ContextEntity<GraphI, GraphA>,
    StateSchemaEntity<GraphI, GraphA>,
    EventEntity<GraphI, GraphA>
  >
  modal: Interpreter<ContextModal, StateSchemaModal, EventModal>
  layout: Interpreter<ContextLayout, StateSchemaLayout, EventLayout>
  node: Interpreter<ContextNode, StateSchemaNode, EventNode>
  graphQLDemo: Interpreter<any, any, any>
}
