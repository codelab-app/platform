import { CreatePageInput } from '@codelab/backend/modules/page'
import { AtomType, QueryMethod } from '@codelab/shared/abstract/core'

export const textElementInput = {
  newElement: {
    refId: '0x299',
    name: 'Text',
    atom: { atomType: AtomType.Text },
  },
}

export const buttonComponentInput = {
  newElement: {
    // Button component
    refId: 'button_ref', // Used for referencing the component
    name: 'Button',
    css: 'color: red',
    atom: { atomType: AtomType.HtmlButton },
    isComponent: true,
  },
}

export const firstButtonInput = {
  newElement: {
    // Element + button component
    name: 'First button',
    children: [buttonComponentInput],
  },
}

export const secondButtonInput = {
  // Second element + existing button component ref
  newElement: {
    name: 'Second button',
    children: [{ elementId: 'button_ref' }], // Resolves to adding the component we created above
  },
}

export const createPageInput: Omit<CreatePageInput, 'appId'> = {
  name: 'My awesome page',
  rootElement: {
    name: 'Root element',
    css: 'display: block;',
    hooks: [
      {
        queryHook: {
          queryKey: 'getProducts',
          url: 'https://api.com/products',
          method: QueryMethod.Get,
        },
      },
    ],
    propMapBindings: [
      {
        targetElementId: '0x299', // resolves to the actual ID of the created 'Text' element
        targetKey: 'text',
        sourceKey: 'products[0].name',
      },
    ],
    children: [textElementInput, firstButtonInput, secondButtonInput],
  },
}
