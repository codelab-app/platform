import { Actor, EventObject, Sender } from 'xstate'
import { ActorRefLike } from '@xstate/react/lib/types'

declare module 'express-restify-mongoose'
declare module 'deepdash/standalone'
declare module '@xstate/react' {
  function useActor<TContext, TEvent extends EventObject, TEmitted = any>(
    actorRef: ActorRefLike<TEvent, TEmitted> | Actor<TContext, TEvent>,
    getSnapshot?: (actor: typeof actorRef) => TEmitted,
  ): [TEmitted, Sender<TEvent>]
}
