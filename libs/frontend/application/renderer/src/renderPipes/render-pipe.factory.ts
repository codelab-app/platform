import type { IRenderPipe } from '@codelab/frontend/abstract/application'
import { AtomRenderPipe } from './atom-render-pipe'
import { ChildMapperRenderPipe } from './child-mapper-render-pipe'
import { ChildrenRenderPipe } from './children-render-pipe'
import { ComponentInstanceChildrenRenderPipe } from './component-instance-children-render-pipe'
import { ComponentRenderPipe } from './component-render-pipe'
import { NullRenderPipe } from './null-render-pipe'
import { PageRenderPipe } from './page-render-pipe'
import type { PassThroughRenderPipe } from './pass-through-render-pipe'
import { PreRenderPipe } from './pre-render-pipe'

export type RenderPipeClass =
  | typeof AtomRenderPipe
  | typeof ComponentRenderPipe
  | typeof PassThroughRenderPipe
  | typeof PreRenderPipe

// define pipes in order of execution, we reverse it so that it matches the order of calling next
export const defaultPipes: Array<RenderPipeClass> = [
  PreRenderPipe,
  ComponentRenderPipe,
  PageRenderPipe,
  ChildrenRenderPipe,
  ComponentInstanceChildrenRenderPipe,
  ChildMapperRenderPipe,
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
