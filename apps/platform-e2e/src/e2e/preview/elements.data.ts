import type {
  ICreateElementData,
  IElementDto,
  IPageDto,
  IRef,
} from '@codelab/shared/abstract/core'
import { IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { v4 } from 'uuid'
import { actionTypeId, apiPostActionId } from './resource.data.ts'

const elementFormId = v4()

export const elementForm = (page: IPageDto): ICreateElementData => ({
  atom: IAtomType.AntDesignForm,
  id: elementFormId,
  name: 'Form',
  parentElement: page.rootElement,
  propsData: {
    customText: `<p>Submit Form</p>`,
    htmlType: 'submit',
    onFinish: {
      kind: ITypeKind.ActionType,
      type: actionTypeId,
      value: apiPostActionId,
    },
  },
})

// FormItem
export const elementFormItem_1: ICreateElementData = {
  atom: IAtomType.AntDesignFormItem,
  id: v4(),
  name: 'Form Item',
  parentElement: { id: elementFormId },
  propsData: {
    label: 'Input Field',
    name: 'inputField',
  },
}

// FormItem > Input
const elementFormItemInput_1: ICreateElementData = {
  atom: IAtomType.AntDesignInput,
  id: v4(),
  name: 'Form Item Input',
  parentElement: elementFormItem_1,
}

// FormItem
export const elementFormItem_2: ICreateElementData = {
  atom: IAtomType.AntDesignFormItem,
  id: v4(),
  name: 'Element Form Item Select',
  parentElement: { id: elementFormId },
  propsData: {
    label: 'Select Field',
    name: 'selectField',
  },
}

const elementFormItemInput_2: ICreateElementData = {
  atom: IAtomType.AntDesignSelect,
  id: v4(),
  name: 'Element Select',
  parentElement: elementFormItem_2,
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
}

export const elementFormItem_3: ICreateElementData = {
  atom: IAtomType.AntDesignFormItem,
  id: v4(),
  name: 'Element Form Item Checkbox',
  parentElement: { id: elementFormId },
  propsData: {
    name: 'checkboxField',
    valuePropName: 'checked',
  },
}

const elementFormItemInput_3: ICreateElementData = {
  atom: IAtomType.AntDesignCheckbox,
  id: v4(),
  name: 'Element Checkbox',
  parentElement: elementFormItem_3,
  propsData: {
    customText: '<p>Checkbox Field</p>',
  },
}

const elementFormItem_4: ICreateElementData = {
  atom: IAtomType.AntDesignFormItem,
  id: v4(),
  name: 'Element Form Item Button',
  parentElement: { id: elementFormId },
}

const elementFormItemInput_4: ICreateElementData = {
  atom: IAtomType.AntDesignButton,
  id: v4(),
  name: 'Element Button',
  parentElement: elementFormItem_4,
  propsData: {
    customText: `<p>Submit Form</p>`,
    htmlType: 'submit',
  },
}

export const elements: Array<ICreateElementData> = [
  elementFormItem_1,
  // elementFormItemInput_1,
  // elementFormItem_2,
  // elementFormItemInput_2,
  // elementFormItem_3,
  // elementFormItemInput_3,
  // elementFormItem_4,
  // elementFormItemInput_4,
]
