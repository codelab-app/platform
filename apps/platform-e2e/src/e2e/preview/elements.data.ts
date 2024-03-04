import type { ICreateElementData } from '@codelab/shared/abstract/core'
import { IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { actionTypeId, apiPostActionId } from './resource.data.ts'

const ELEMENT_FORM = 'Element Form'
const ELEMENT_FORM_ITEM_INPUT = 'Element Form Item Input'

export const ELEMENT_INPUT_NAME = 'inputField'

const ELEMENT_INPUT = 'Element Input'
const ELEMENT_FORM_ITEM_SELECT = 'Element Form Item Select'

export const ELEMENT_SELECT_NAME = 'selectField'

const ELEMENT_SELECT = 'Element Select'
const ELEMENT_FORM_ITEM_CHECKBOX = 'Element Form Item Checkbox'

export const ELEMENT_CHECKBOX_NAME = 'checkboxField'

const ELEMENT_CHECKBOX = 'Element Checkbox'
const ELEMENT_FORM_ITEM_BUTTON = 'Element Form Item Button'
const ELEMENT_BUTTON_TITLE = 'Submit Form'
const ELEMENT_BUTTON = 'Element Button'

export const elementForm = {
  atom: IAtomType.AntDesignForm,
  name: ELEMENT_FORM,
  parentElement: ROOT_ELEMENT_NAME,
  propsData: {
    customText: `<p>${ELEMENT_BUTTON_TITLE}</p>`,
    htmlType: 'submit',
    onFinish: {
      kind: ITypeKind.ActionType,
      type: actionTypeId,
      value: apiPostActionId,
    },
  },
}

const elements: Array<ICreateElementData> = [
  {
    atom: IAtomType.AntDesignFormItem,
    name: ELEMENT_FORM_ITEM_INPUT,
    parentElement: ELEMENT_FORM,
    propsData: {
      label: 'Input Field',
      name: ELEMENT_INPUT_NAME,
    },
  },
  {
    atom: IAtomType.AntDesignInput,
    name: ELEMENT_INPUT,
    parentElement: ELEMENT_FORM_ITEM_INPUT,
  },
  {
    atom: IAtomType.AntDesignFormItem,
    name: ELEMENT_FORM_ITEM_SELECT,
    parentElement: ELEMENT_FORM,
    propsData: {
      label: 'Select Field',
      name: ELEMENT_SELECT_NAME,
    },
  },
  {
    atom: IAtomType.AntDesignSelect,
    name: ELEMENT_SELECT,
    parentElement: ELEMENT_FORM_ITEM_SELECT,
    propsData: {
      options: [
        {
          label: 'Select Option A',
          value: 'selectOptionA',
        },
        {
          label: 'Select Option B',
          value: 'selectOptionB',
        },
      ],
    },
  },
  {
    atom: IAtomType.AntDesignFormItem,
    name: ELEMENT_FORM_ITEM_CHECKBOX,
    parentElement: ELEMENT_FORM,
    propsData: {
      name: ELEMENT_CHECKBOX_NAME,
      valuePropName: 'checked',
    },
  },
  {
    atom: IAtomType.AntDesignCheckbox,
    name: ELEMENT_CHECKBOX,
    parentElement: ELEMENT_FORM_ITEM_CHECKBOX,
    propsData: {
      customText: '<p>Checkbox Field</p>',
    },
  },
  {
    atom: IAtomType.AntDesignFormItem,
    name: ELEMENT_FORM_ITEM_BUTTON,
    parentElement: ELEMENT_FORM,
  },
  {
    atom: IAtomType.AntDesignButton,
    name: ELEMENT_BUTTON,
    parentElement: ELEMENT_FORM_ITEM_BUTTON,
    propsData: {
      customText: `<p>${ELEMENT_BUTTON_TITLE}</p>`,
      htmlType: 'submit',
    },
  },
]
