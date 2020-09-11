// Conditional type to filter DOMHandlers
import {
  AnimationEventHandler,
  ClipboardEventHandler,
  CompositionEventHandler,
  DOMAttributes,
  FocusEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactEventHandler,
  TouchEventHandler,
  TransitionEventHandler,
  UIEventHandler,
  WheelEventHandler,
} from 'react'

export type EventHandlerPropertyKeys<T, EventHandler> = {
  [K in keyof T]: Required<T>[K] extends EventHandler ? K : never
}[keyof T]

export type MouseEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, MouseEventHandler>,
  undefined
>

export type ClipboardEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, ClipboardEventHandler>,
  undefined
>

export type CompositionEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, CompositionEventHandler>,
  undefined
>

export type FocusEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, FocusEventHandler>,
  undefined
>

export type FormEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, FormEventHandler>,
  undefined
>

export type ImageEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, ReactEventHandler>,
  undefined
>

export type KeyboardEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, KeyboardEventHandler>,
  undefined
>

export type MediaEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, ReactEventHandler>,
  undefined
>

export type SelectionEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, ReactEventHandler>,
  undefined
>

export type TouchEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, TouchEventHandler>,
  undefined
>

export type PointerEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, PointerEventHandler>,
  undefined
>

export type UiEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, UIEventHandler>,
  undefined
>

export type WheelEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, WheelEventHandler>,
  undefined
>

export type AnimationEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, AnimationEventHandler>,
  undefined
>

export type TransitionEventKeys = Exclude<
  EventHandlerPropertyKeys<DOMAttributes<any>, TransitionEventHandler>,
  undefined
>
