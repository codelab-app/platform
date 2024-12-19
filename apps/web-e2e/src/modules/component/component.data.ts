import type { ICreateCypressElementData } from '@codelab/shared/abstract/core'

import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'

export const COMPONENT_PROP_VALUE = 'component_prop_value'
export const COMPONENT_INSTANCE_TEXT = 'component_instance_text'

export const componentInstance: ICreateCypressElementData = {
  atom: 'New Component',
  name: 'Component Instance',
  parentElement: ROOT_ELEMENT_NAME,
}

export const componentTextElement: ICreateCypressElementData = {
  atom: IAtomType.AntDesignTypographyText,
  name: 'Component Text',
  parentElement: 'New Component Root',
  propsData: `{
    "children": {
      "kind": "RichTextType",
      "type": "e7558508-3bb7-4f57-8f8c-6ac989911765",
      "value": "<p class=\\"editor-paragraph\\">text {{componentProps.component_prop}}</p>"
    }
  }`,
}

export const componentInstanceChild = {
  atom: IAtomType.AntDesignTypographyText,
  name: 'Component Instance Child',
  parentElement: componentInstance.name,
  propsData: `{
    "children": {
      "kind": "RichTextType",
      "type": "e7558508-3bb7-4f57-8f8c-6ac989911765",
      "value": "<p class=\\"editor-paragraph\\">${COMPONENT_INSTANCE_TEXT}</p>"
    }
  }`,
}
