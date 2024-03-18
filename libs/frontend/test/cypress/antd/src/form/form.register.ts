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
import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'

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
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: getFormField,
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: getFormInput,
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: expectSelectValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: expectMultiSelectValue,
  },
  {
    fn: expectSelectPlaceholder,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: expectFormFieldValue,
  },
  {
    fn: expectFormFieldError,
  },
  {
    fn: expectFormFields,
  },
  {
    fn: expectFormFieldsFn,
  },
  {
    fn: getSelectDropdown,
  },
  {
    fn: scrollSelectDropdown,
  },
  {
    fn: chooseSelectDropdownOption,
  },
  {
    fn: expectSelectDropdownToClose,
  },
  {
    fn: setInputValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: setSelectValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: clearMultiselect,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: closeMultiselectOptions,
  },
  {
    fn: setMultiselectValue,
  },
  {
    fn: setTagsValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: setRadioValue,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: setDatePickerValue,
  },
  {
    fn: setFormFieldValue,
    options: {
      prevSubject: 'optional',
    },
  },
  {
    fn: setFormFieldValueFn,
  },
  {
    fn: setFormFieldValues,
  },
  {
    fn: setFormFieldValuesFn,
  },
]
