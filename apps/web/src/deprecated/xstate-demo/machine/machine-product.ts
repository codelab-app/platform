import { DoneInvokeEvent, Machine, assign, sendParent } from 'xstate'

interface ProductContext {
  productCategory: any
  products: Array<any>
}

interface ProductStateSchema {
  states: {
    failure: object
    loading: object
    selecting: object
    finished: object
  }
}

type ProductEvent = { type: 'ADD' } | { type: 'REMOVE' } | { type: 'DONE' }

export const fetchProducts = (
  productCategory: ProductContext['productCategory'],
) => {
  return Promise.reject(new Error('No products in this category'))

  // return Promise.resolve([
  //   {
  //     name: 'Cheese',
  //     price: 250,
  //   },
  //   {
  //     name: 'Crisps',
  //     price: 300,
  //   },
  //   {
  //     name: 'Pizza',
  //     price: 420,
  //   },
  // ])
}

export const productMachine = Machine<
  ProductContext,
  ProductStateSchema,
  ProductEvent & DoneInvokeEvent<any>
>({
  id: 'product',
  initial: 'loading',
  context: {
    productCategory: undefined,
    products: [],
  },
  states: {
    failure: {},
    loading: {
      invoke: {
        src: (ctx) => fetchProducts(ctx.productCategory),
        onDone: {
          target: 'selecting',
          actions: assign({
            products: (ctx, event) => {
              return event.data.map((e: any) => {
                return {
                  ...e,
                  quantity: 0,
                }
              })
            },
          }),
        },
        onError: {
          target: 'failure',
          actions: sendParent((ctx, event) => {
            return {
              type: 'NOTIFY',
              data: {
                id: Date.now.toString(),
                originalError: event.data,
                message: event.data.message,
                type: 'error',
              },
            }
          }),
        },
      },
    },
    selecting: {
      on: {
        ADD: {
          actions: assign({
            products: (ctx, event) => {
              return ctx.products.map((e) => {
                return {
                  ...e,
                  quantity:
                    e.name === event.data.name ? e.quantity + 1 : e.quantity,
                }
              })
            },
          }),
        },
        REMOVE: {
          actions: assign({
            products: (ctx, event) => {
              return ctx.products.map((e) => {
                return {
                  ...e,
                  quantity:
                    e.name === event.data.name ? e.quantity - 1 : e.quantity,
                }
              })
            },
          }),
        },
        DONE: 'finished',
      },
    },
    finished: {
      type: 'final',
      data: (ctx) => {
        return {
          selectedProducts: ctx.products.filter((e) => e.quantity > 0),
        }
      },
    },
  },
})
