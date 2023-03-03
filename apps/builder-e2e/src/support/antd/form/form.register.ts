import type { OmitFirstArg } from '../../deprecated/types'
import type { CypressCommand } from '../../types'
import {
  chooseSelectDropdownOption,
  clearMultiselect,
  closeMultiselectOptions,
  expectFormFieldError,
  expectFormFields,
  expectFormFieldsFn,
  expectFormFieldValue,
  expectMultiSelectValue,
  expectSelectDropdownToClose,
  expectSelectPlaceholder,
  expectSelectValue,
  getFormField,
  getFormFieldLabel,
  getFormInput,
  getSelectDropdown,
  scrollSelectDropdown,
  setDatePickerValue,
  setFormFieldValue,
  setFormFieldValueFn,
  setFormFieldValues,
  setFormFieldValuesFn,
  setInputValue,
  setMultiselectValue,
  setRadioValue,
  setSelectValue,
  setTagsValue,
} from './form.commands'
import PrevSubject = Cypress.PrevSubject

export interface AntFormCommands {
  getFormFieldLabel: OmitFirstArg<typeof getFormFieldLabel>
  getFormField: typeof getFormField
  getFormInput: OmitFirstArg<typeof getFormInput>
  expectSelectValue: typeof expectSelectValue
  expectMultiSelectValue: typeof expectMultiSelectValue
  expectSelectPlaceholder: typeof expectSelectPlaceholder
  expectFormFieldValue: typeof expectFormFieldValue
  expectFormFieldError: typeof expectFormFieldError
  expectFormFields: typeof expectFormFields
  expectFormFieldsFn: typeof expectFormFieldsFn
  getSelectDropdown: typeof getSelectDropdown
  scrollSelectDropdown: typeof scrollSelectDropdown
  chooseSelectDropdownOption: typeof chooseSelectDropdownOption
  expectSelectDropdownToClose: typeof expectSelectDropdownToClose
  setInputValue: OmitFirstArg<typeof setInputValue>
  setSelectValue: typeof setSelectValue
  clearMultiselect: typeof clearMultiselect
  closeMultiselectOptions: typeof closeMultiselectOptions
  setMultiselectValue: typeof setMultiselectValue
  setTagsValue: typeof setTagsValue
  setRadioValue: typeof setRadioValue
  setDatePickerValue: typeof setDatePickerValue
  setFormFieldValue: OmitFirstArg<typeof setFormFieldValue>
  setFormFieldValueFn: typeof setFormFieldValueFn
  setFormFieldValues: typeof setFormFieldValues
  setFormFieldValuesFn: typeof setFormFieldValuesFn
}

export const antFormCommands: Array<CypressCommand> = [
  {
    fn: getFormFieldLabel,
    name: 'getFormFieldLabel',
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: getFormField,
    name: 'getFormField',
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: getFormInput,
    name: 'getFormInput',
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: expectSelectValue,
    name: 'expectSelectValue',
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: expectMultiSelectValue,
    name: 'expectMultiSelectValue',
  },
  {
    fn: expectSelectPlaceholder,
    name: 'expectSelectPlaceholder',
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: expectFormFieldValue,
    name: 'expectFormFieldValue',
  },
  {
    fn: expectFormFieldError,
    name: 'expectFormFieldError',
  },
  {
    fn: expectFormFields,
    name: 'expectFormFields',
  },
  {
    fn: expectFormFieldsFn,
    name: 'expectFormFieldsFn',
  },
  {
    fn: getSelectDropdown,
    name: 'getSelectDropdown',
  },
  {
    fn: scrollSelectDropdown,
    name: 'scrollSelectDropdown',
  },
  {
    fn: chooseSelectDropdownOption,
    name: 'chooseSelectDropdownOption',
  },
  {
    fn: expectSelectDropdownToClose,
    name: 'expectSelectDropdownToClose',
  },
  {
    fn: setInputValue,
    name: 'setInputValue',
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: setSelectValue,
    name: 'setSelectValue',
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: clearMultiselect,
    name: 'clearMultiselect',
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: closeMultiselectOptions,
    name: 'closeMultiselectOptions',
  },
  {
    fn: setMultiselectValue,
    name: 'setMultiselectValue',
  },
  {
    fn: setTagsValue,
    name: 'setTagsValue',
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: setRadioValue,
    name: 'setRadioValue',
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: setDatePickerValue,
    name: 'setDatePickerValue',
  },
  {
    fn: setFormFieldValue,
    name: 'setFormFieldValue',
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: setFormFieldValueFn,
    name: 'setFormFieldValueFn',
  },
  {
    fn: setFormFieldValues,
    name: 'setFormFieldValues',
  },
  {
    fn: setFormFieldValuesFn,
    name: 'setFormFieldValuesFn',
  },
]
