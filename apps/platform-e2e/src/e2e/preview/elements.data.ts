import type {
  ICreateElementData,
  IPageDto,
} from '@codelab/shared/abstract/core'
import { IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { actionTypeId, apiPostActionId } from './action.data.js'

const elementFormId = v4()

export const elementFormName = 'Element Form'

export const elementForm = (page: IPageDto): ICreateElementData => ({
  atom: IAtomType.AntDesignForm,
  id: elementFormId,
  name: elementFormName,
  parentElement: { id: page.rootElement.id },
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
  name: 'Form Item (Input)',
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
  name: 'Input',
  parentElement: { id: elementFormItem_1.id },
}

// FormItem
export const elementFormItem_2: ICreateElementData = {
  atom: IAtomType.AntDesignFormItem,
  id: v4(),
  name: 'Form Item (Select)',
  prevSibling: { id: elementFormItem_1.id },
  propsData: {
    label: 'Select Field',
    name: 'selectField',
  },
}

const elementFormItemInput_2: ICreateElementData = {
  atom: IAtomType.AntDesignSelect,
  id: v4(),
  name: 'Select Input',
  parentElement: { id: elementFormItem_2.id },
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
  name: 'Form Item (Checkbox)',
  prevSibling: { id: elementFormItem_2.id },
  propsData: {
    name: 'checkboxField',
    valuePropName: 'checked',
  },
}

const elementFormItemInput_3: ICreateElementData = {
  atom: IAtomType.AntDesignCheckbox,
  id: v4(),
  name: 'Checkbox Input',
  parentElement: { id: elementFormItem_3.id },
  propsData: {
    customText: '<p>Checkbox Field</p>',
  },
}

const elementFormItem_4: ICreateElementData = {
  atom: IAtomType.AntDesignFormItem,
  id: v4(),
  name: 'Element Form Item Button',
  prevSibling: { id: elementFormItem_3.id },
}

const elementFormItemInput_4: ICreateElementData = {
  atom: IAtomType.AntDesignButton,
  id: v4(),
  name: 'Element Button',
  parentElement: { id: elementFormItem_4.id },
  propsData: {
    customText: `<p>Submit Form</p>`,
    htmlType: 'submit',
  },
}

export const elements: Array<ICreateElementData> = [
  elementFormItem_1,
  elementFormItemInput_1,
  elementFormItem_2,
  elementFormItemInput_2,
  elementFormItem_3,
  elementFormItemInput_3,
  elementFormItem_4,
  elementFormItemInput_4,
]
