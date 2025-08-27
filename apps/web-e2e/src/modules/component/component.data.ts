import type { ICreateElementSeedData } from '@codelab/shared-abstract-core'

import { typedProp } from '@codelab/frontend-abstract-domain'
import { IAtomType, ITypeKind } from '@codelab/shared-abstract-core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared-config-env'

export const COMPONENT_PROP_VALUE = 'component_prop_value'
export const COMPONENT_INSTANCE_TEXT = 'component_instance_text'

export const componentInstance: ICreateElementSeedData = {
  atom: 'New Component',
  name: 'Component Instance',
  parentElement: ROOT_ELEMENT_NAME,
}

export const componentTextElement: ICreateElementSeedData = {
  atom: IAtomType.AntDesignTypographyText,
  name: 'Component Text',
  parentElement: 'New Component Root',
  propsData: {
    children: typedProp({
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: 'text {{componentProps.component_prop}}',
    }),
  },
}

export const componentInstanceChild = {
  atom: IAtomType.AntDesignTypographyText,
  name: 'Component Instance Child',
  parentElement: componentInstance.name,
  propsData: {
    children: typedProp({
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: COMPONENT_INSTANCE_TEXT,
    }),
  },
}
