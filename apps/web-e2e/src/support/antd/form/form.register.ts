import { CypressCommand } from '../../types'
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

export interface AntFormCommands {
  getFormFieldLabel: typeof getFormFieldLabel
  getFormField: typeof getFormField
  getFormInput: typeof getFormInput
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
  setInputValue: typeof setInputValue
  setSelectValue: typeof setSelectValue
  clearMultiselect: typeof clearMultiselect
  closeMultiselectOptions: typeof closeMultiselectOptions
  setMultiselectValue: typeof setMultiselectValue
  setTagsValue: typeof setTagsValue
  setRadioValue: typeof setRadioValue
  setDatePickerValue: typeof setDatePickerValue
  setFormFieldValue: typeof setFormFieldValue
  setFormFieldValueFn: typeof setFormFieldValueFn
  setFormFieldValues: typeof setFormFieldValues
  setFormFieldValuesFn: typeof setFormFieldValuesFn
}

export const antFormCommands: Array<CypressCommand> = [
  {
    name: 'getFormFieldLabel',
    fn: getFormFieldLabel,
  },
  {
    name: 'getFormField',
    fn: getFormField,
  },
  {
    name: 'getFormInput',
    fn: getFormInput,
  },
  {
    name: 'expectSelectValue',
    fn: expectSelectValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    name: 'expectMultiSelectValue',
    fn: expectMultiSelectValue,
  },
  {
    name: 'expectSelectPlaceholder',
    fn: expectSelectPlaceholder,
    options: {
      prevSubject: 'element',
    },
  },
  {
    name: 'expectFormFieldValue',
    fn: expectFormFieldValue,
  },
  {
    name: 'expectFormFieldError',
    fn: expectFormFieldError,
  },
  {
    name: 'expectFormFields',
    fn: expectFormFields,
  },
  {
    name: 'expectFormFieldsFn',
    fn: expectFormFieldsFn,
  },
  {
    name: 'getSelectDropdown',
    fn: getSelectDropdown,
  },
  {
    name: 'scrollSelectDropdown',
    fn: scrollSelectDropdown,
  },
  {
    name: 'chooseSelectDropdownOption',
    fn: chooseSelectDropdownOption,
  },
  {
    name: 'expectSelectDropdownToClose',
    fn: expectSelectDropdownToClose,
  },
  {
    name: 'setInputValue',
    fn: setInputValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    name: 'setSelectValue',
    fn: setSelectValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    name: 'clearMultiselect',
    fn: clearMultiselect,
    options: {
      prevSubject: 'element',
    },
  },
  {
    name: 'closeMultiselectOptions',
    fn: closeMultiselectOptions,
  },
  {
    name: 'setMultiselectValue',
    fn: setMultiselectValue,
  },
  {
    name: 'setTagsValue',
    fn: setTagsValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    name: 'setRadioValue',
    fn: setRadioValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    name: 'setDatePickerValue',
    fn: setDatePickerValue,
  },
  {
    name: 'setFormFieldValue',
    fn: setFormFieldValue,
  },
  {
    name: 'setFormFieldValueFn',
    fn: setFormFieldValueFn,
  },
  {
    name: 'setFormFieldValues',
    fn: setFormFieldValues,
  },
  {
    name: 'setFormFieldValuesFn',
    fn: setFormFieldValuesFn,
  },
]
