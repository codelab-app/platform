import type { IRenderPipe } from '@codelab/frontend/abstract/core'
import { AtomRenderPipe } from './atom-render-pipe'
import { ComponentRenderPipe } from './component-render-pipe'
import { ConditionalRenderPipe } from './conditional-render-pipe'
import { LoopingRenderPipe } from './looping-render-pipe'
import { NullRenderPipe } from './null-render-pipe'
import type { PassThroughRenderPipe } from './pass-through-render-pipe'

export type RenderPipeClass =
  | typeof AtomRenderPipe
  | typeof ComponentRenderPipe
  | typeof ConditionalRenderPipe
  | typeof LoopingRenderPipe
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
