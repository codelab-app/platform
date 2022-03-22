import { AtomRenderPipe } from './AtomRenderPipe'
import { ComponentRenderPipe } from './ComponentRenderPipe'
import { ConditionalRenderPipe } from './ConditionalRenderPipe'
import { LoopingRenderPipe } from './LoopingRenderPipe'
import { NullRenderPipe } from './NullRenderPipe'

// define pipes in order of execution, we reverse is to that it matches the order of calling next
const pipes = [
  LoopingRenderPipe,
  ConditionalRenderPipe,
  ComponentRenderPipe,
  AtomRenderPipe,
].reverse()

export const rootRenderPipeFactory = () =>
  pipes.reduce((acc, Pipe) => new Pipe({ next: acc }), new NullRenderPipe({}))
