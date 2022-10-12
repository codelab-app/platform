import {
  IComponentService,
  IElementService,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import { prop, Ref } from 'mobx-keystone'
import { AtomRenderPipe } from './atomRenderPipe'
import { ComponentRenderPipe } from './componentRenderPipe'
import { ConditionalRenderPipe } from './conditionalRenderPipe'
import { LoopingRenderPipe } from './loopingRenderPipe'
import { NullRenderPipe } from './nullRenderPipe'
import { PassThroughRenderPipe } from './passThroughRenderPipe'

export type RenderPipeClass =
  | typeof LoopingRenderPipe
  | typeof ConditionalRenderPipe
  | typeof ComponentRenderPipe
  | typeof AtomRenderPipe
  | typeof PassThroughRenderPipe

// define pipes in order of execution, we reverse is to that it matches the order of calling next
export const defaultPipes: Array<RenderPipeClass> = [
  LoopingRenderPipe,
  ConditionalRenderPipe,
  ComponentRenderPipe,
  AtomRenderPipe,
].reverse()

/**
 * We're basically create each pipe, then passing the ref in to the next pipe during instantiation
 */
export const renderPipeFactory = (pipes: Array<RenderPipeClass>) =>
  pipes.reduce<IRenderPipe>(
    (acc, Pipe) => {
      return new Pipe({ next: acc })
    },
    // This is the fallback renderer
    new NullRenderPipe({}),
  )
