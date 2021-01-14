import { DoneInvokeEvent, Machine, assign, send, spawn } from 'xstate'
import { notificationsMachine } from './machine-notification'
import { productMachine } from './machine-product'

export enum CheckoutStateName {
  IDLE = 'IDLE',
  PRODUCT = 'PRODUCT',
  SHIPPING = 'SHIPPING',
  PAYMENT = 'PAYMENT',
  CONFIRMATION = 'CONFIRMATION',
}

export interface CheckoutContext {
  productCategory: any
  selectedProducts: any
  notificationsMachineRef: any
}

export interface CheckoutStateSchema {
  states: {
    [CheckoutStateName.IDLE]: object
    [CheckoutStateName.PRODUCT]: object
    [CheckoutStateName.SHIPPING]: object
    [CheckoutStateName.PAYMENT]: object
    [CheckoutStateName.CONFIRMATION]: object
  }
}

export enum CheckoutEventName {
  INIT = 'INIT',
  DONE = 'DONE',
  NOTIFY = 'NOTIFY',
}

export type CheckoutEvent = (
  | {
      type: CheckoutEventName.INIT
    }
  | { type: CheckoutEventName.DONE }
  | { type: CheckoutEventName.NOTIFY }
) &
  DoneInvokeEvent<any>

export type CheckoutState =
  | {
      value: CheckoutStateName.IDLE
      context: CheckoutContext
    }
  | {
      value: CheckoutStateName.PRODUCT
      context: CheckoutContext
    }
  | {
      value: CheckoutStateName.SHIPPING
      context: CheckoutContext
    }
  | {
      value: CheckoutStateName.PAYMENT
      context: CheckoutContext
    }
  | {
      value: CheckoutStateName.CONFIRMATION
      context: CheckoutContext
    }

export const checkoutMachine = Machine<
  CheckoutContext,
  CheckoutStateSchema,
  CheckoutEvent
>({
  id: 'checkout',
  initial: CheckoutStateName.IDLE,
  context: {
    productCategory: undefined,
    selectedProducts: undefined,
    notificationsMachineRef: undefined,
  },
  entry: assign({
    notificationsMachineRef: (ctx) =>
      spawn(notificationsMachine, 'notificationsMachine'),
  }),
  states: {
    [CheckoutStateName.IDLE]: {
      on: {
        [CheckoutEventName.INIT]: {
          target: CheckoutStateName.PRODUCT,
          actions: assign({
            productCategory: (ctx, event) => event.data.productCategory,
          }),
        },
      },
    },
    [CheckoutStateName.PRODUCT]: {
      invoke: {
        id: 'productMachine',
        src: productMachine,
        data: {
          productCategory: (ctx: CheckoutContext) => ctx.productCategory,
          products: [],
        },
        onDone: {
          target: CheckoutStateName.SHIPPING,
          actions: assign({
            selectedProducts: (ctx, event) => event.data.selectedProducts,
          }),
        },
      },
      on: {
        [CheckoutEventName.NOTIFY]: {
          actions: send(
            (ctx, event: any) => {
              return {
                type: 'ALERT',
                data: event.data,
              }
            },
            {
              to: 'notificationsMachine',
            },
          ),
        },
      },
    },
    [CheckoutStateName.SHIPPING]: {
      on: {
        [CheckoutEventName.DONE]: CheckoutStateName.PAYMENT,
      },
    },
    [CheckoutStateName.PAYMENT]: {
      on: {
        [CheckoutEventName.DONE]: CheckoutStateName.CONFIRMATION,
      },
    },
    [CheckoutStateName.CONFIRMATION]: {
      type: 'final',
    },
  },
})

export type CheckoutStateMachine = typeof checkoutMachine
