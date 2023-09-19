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
  chooseSelectDropdownOption: typeof chooseSelectDropdownOption
  clearMultiselect: typeof clearMultiselect
  closeMultiselectOptions: typeof closeMultiselectOptions
  expectFormFieldError: typeof expectFormFieldError
  expectFormFieldValue: typeof expectFormFieldValue
  expectFormFields: typeof expectFormFields
  expectFormFieldsFn: typeof expectFormFieldsFn
  expectMultiSelectValue: typeof expectMultiSelectValue
  expectSelectDropdownToClose: typeof expectSelectDropdownToClose
  expectSelectPlaceholder: typeof expectSelectPlaceholder
  expectSelectValue: typeof expectSelectValue
  getFormField: typeof getFormField
  getFormFieldLabel: OmitFirstArg<typeof getFormFieldLabel>
  getFormInput: OmitFirstArg<typeof getFormInput>
  getSelectDropdown: typeof getSelectDropdown
  scrollSelectDropdown: typeof scrollSelectDropdown
  setDatePickerValue: typeof setDatePickerValue
  setFormFieldValue: OmitFirstArg<typeof setFormFieldValue>
  setFormFieldValueFn: typeof setFormFieldValueFn
  setFormFieldValues: typeof setFormFieldValues
  setFormFieldValuesFn: typeof setFormFieldValuesFn
  setInputValue: OmitFirstArg<typeof setInputValue>
  setMultiselectValue: typeof setMultiselectValue
  setRadioValue: typeof setRadioValue
  setSelectValue: typeof setSelectValue
  setTagsValue: typeof setTagsValue
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
