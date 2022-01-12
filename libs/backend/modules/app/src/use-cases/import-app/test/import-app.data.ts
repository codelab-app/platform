import { CreateAtomInput } from '@codelab/backend/modules/atom'
import {
  AddHookToElementInput,
  CreateComponentInput,
  CreateElementInput,
  CreatePropMapBindingInput,
} from '@codelab/backend/modules/element'
import { CreatePageInput } from '@codelab/backend/modules/page'
import { AtomType, QueryMethod } from '@codelab/shared/abstract/core'
import { CreateAppInput } from '../../create-app'

export const testAppInput: CreateAppInput = { name: 'My awesome app' }

export const testPageInput: Omit<CreatePageInput, 'appId'> = {
  name: 'Test page',
}

export const textAtomInput: CreateAtomInput = {
  type: AtomType.Text,
  name: 'Text',
}

export const buttonAtomInput: CreateAtomInput = {
  type: AtomType.HtmlButton,
  name: 'Button',
}

export const redButtonComponentInput: CreateComponentInput = {
  name: 'Red button component',
}

export const testHookInput: Omit<AddHookToElementInput, 'elementId'> = {
  type: AtomType.HookQueryConfig,
  config: JSON.stringify({
    queryKey: 'getProducts',
    url: 'https://api.com/products',
    method: QueryMethod.Get,
  }),
}

export const testPmbInput: Omit<
  CreatePropMapBindingInput,
  'elementId' | 'targetElementId'
> = {
  targetKey: 'text',
  sourceKey: 'products[0].name',
}

export const containerElementInput: CreateElementInput = {
  name: 'Test container',
  css: 'display: block;',
}

export const textElementInput: CreateElementInput = { name: 'Text', order: 1 }
export const buttonTextElementInput: CreateElementInput = {
  name: 'Button text',
  props: '{"text": "Click me"}',
}

export const firstButtonInput: CreateElementInput = {
  name: 'First button',
  order: 2,
}

export const secondButtonInput: CreateElementInput = {
  name: 'Second button',
  order: 3,
}
