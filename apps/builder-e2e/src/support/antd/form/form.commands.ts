import { absoluteRoot } from '@hon2a/cypress-without'
import CodeMirror from 'codemirror'
import escapeRegExp from 'lodash/escapeRegExp'
import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isUndefined from 'lodash/isUndefined'
import type { CodeMirrorHTMLElement } from '../../../types/code-mirror'
import { wrapSubject } from '../../deprecated/utils'
import { CommonOptions, Label } from '../types'
import { ifOnClock, logAndMute, tickIfOnClock, TickOptions } from '../utils'
import {
  type ExpectFormFieldErrorArgs,
  type ExpectFormFieldsArgs,
  type ExpectFormFieldValueArgs,
  type FormFieldOptions,
  type FormFieldValueOptions,
  type FormFieldValueOrErrorOptions,
  type FormInputOptions,
  type ScrollPosition,
  type SetFormFieldValueArgs,
  type SetFormFieldValuesArgs,
  FIELD_TYPE,
} from './form.types'
import {
  dropdownSelector,
  getSelectSearchPart,
  getSelectValuePart,
  mergeFields,
  on,
  scrollToToVerticalPosition,
  unlockSelectDropdownOptions,
  unsupportedFieldType,
} from './form.utils'

export const getFormFieldLabel = (
  subject: any,
  { label, ...options }: FormFieldOptions & CommonOptions,
): Cypress.Chainable<any> => {
  const opts = logAndMute('getFormFieldLabel', label, options)

  return isUndefined(label)
    ? wrapSubject(subject).find('.ant-form-item-label', opts)
    : wrapSubject(subject).contains(
        '.ant-form-item-label',
        new RegExp(`^${escapeRegExp(label)}$`, 'u'),
        opts,
      )
}

export const getFormField = (
  subject: any,
  { label, ...options }: FormFieldOptions & CommonOptions = {},
): Cypress.Chainable<any> => {
  const opts = logAndMute('getFormField', label, options)

  return isUndefined(label)
    ? cy.get('.ant-form-item', opts)
    : getFormFieldLabel(subject, { label, ...opts }).closest(
        '.ant-form-item',
        opts,
      )
}

export const getFormInput = (
  subject: any,
  {
    label,
    type = FIELD_TYPE.INPUT,
    ...options
  }: FormInputOptions & CommonOptions = {},
) => {
  const opts = logAndMute(
    'getFormInput',
    [label, type].filter(Boolean).join(', '),
    options,
  )

  const scope = label
    ? getFormField(subject, { label, ...opts })
    : wrapSubject(subject)

  switch (type) {
    case FIELD_TYPE.CODE_MIRROR:
      return scope.find('.CodeMirror', opts).then((elem) => {
        return (elem[0] as CodeMirrorHTMLElement).CodeMirror
      })
    case FIELD_TYPE.INPUT:
      return scope.find('.ant-input', opts)
    case FIELD_TYPE.NUMBER_INPUT:
      return scope.find('.ant-input-number-input', opts)
    case FIELD_TYPE.SELECT:
    case FIELD_TYPE.MULTISELECT:
    case FIELD_TYPE.TAGS:
      return getSelectValuePart(scope, opts)
    case FIELD_TYPE.RADIO:
      return scope.find('.ant-radio-group', opts)
    case FIELD_TYPE.DATE:
      return scope.find('.ant-picker-input > input', opts)
    default:
      throw unsupportedFieldType(type)
  }
}

export const expectSelectValue =
  (expectedValue?: string, options?: CommonOptions) => ($el: JQuery) => {
    const opts = logAndMute('expectSelectValue', expectedValue, options)
    const found = on($el).find('.ant-select-selection-item', opts)

    if (expectedValue) {
      found.should('have.text', expectedValue)
    } else {
      found.should('not.exist')
    }
  }

export const expectMultiSelectValue =
  (expectedValues: Array<string>, options?: CommonOptions) => ($el: JQuery) => {
    expectedValues.forEach((val) =>
      on($el)
        .contains('.ant-select-selection-item-content', val, options)
        .should('be.visible'),
    )
  }

export const expectSelectPlaceholder =
  (expectedPlaceholder?: string, options?: CommonOptions) => ($el: JQuery) => {
    const opts = logAndMute(
      'expectSelectPlaceholder',
      expectedPlaceholder,
      options,
    )

    const found = on($el).find('.ant-select-selection-placeholder', opts)

    if (expectedPlaceholder) {
      found.should('have.text', expectedPlaceholder)
    } else {
      found.should('not.exist')
    }
  }

export const expectFormFieldValue = ({
  label,
  type = FIELD_TYPE.INPUT,
  value,
  placeholder,
  scrollIntoView = true,
  ...options
}: FormFieldValueOptions & CommonOptions) => {
  const shouldExpectValue = Boolean(
    (!isObject(value) || !isEmpty(value)) && (isNumber(value) || value),
  )

  const shouldExpectPlaceholder = Boolean(!shouldExpectValue && placeholder)

  const opts = logAndMute(
    'expectFieldValue',
    `${label}: ${shouldExpectValue ? value : '<empty>'}${
      placeholder ? ` (${placeholder})` : ''
    }`,
    options,
  )

  const getInput = () => getFormInput({ label, type, ...opts })

  if (scrollIntoView) {
    getInput().scrollIntoView(opts)
  }

  switch (type) {
    case FIELD_TYPE.INPUT:
    case FIELD_TYPE.NUMBER_INPUT:
    case FIELD_TYPE.DATE:
    case FIELD_TYPE.CODE_MIRROR:
      getInput().should('have.value', isUndefined(value) ? '' : String(value))

      if (shouldExpectPlaceholder) {
        getInput().should('have.attr', 'placeholder', placeholder)
      }

      return
    case FIELD_TYPE.SELECT:
      getInput().then(
        expectSelectValue(isUndefined(value) ? '' : String(value), opts),
      )

      if (shouldExpectPlaceholder) {
        getInput().then(expectSelectPlaceholder(placeholder, opts))
      }

      return
    case FIELD_TYPE.MULTISELECT:
    case FIELD_TYPE.TAGS:
      if (shouldExpectPlaceholder) {
        getInput().then(expectSelectPlaceholder(placeholder, opts))
      }

      if (shouldExpectValue) {
        getInput().then(
          expectMultiSelectValue(
            (isArray(value) ? value : [value]).map(String),
            opts,
          ),
        )
      }

      return
    case FIELD_TYPE.RADIO:
      getInput()
        .contains('.ant-radio-wrapper', String(value), opts)
        .should('have.class', 'ant-radio-wrapper-checked')

      return
    default:
      throw unsupportedFieldType(type)
  }
}

export const expectFormFieldValueFn =
  (field: Omit<ExpectFormFieldValueArgs[0], 'value'>) =>
  (value: ExpectFormFieldValueArgs[0]['value']) =>
    expectFormFieldValue({ ...field, value })

export const expectFormFieldError = ({
  error: expectedHint,
  label,
  ...options
}: { error?: string } & FormFieldOptions & CommonOptions) => {
  const opts = logAndMute(
    'expectFieldError',
    `${label}: ${expectedHint}`,
    options,
  )

  const field = getFormField({ label, ...opts }).find(
    '.ant-form-item-control .ant-form-item-explain',
    opts,
  )

  return expectedHint
    ? field.should('have.text', expectedHint)
    : field.should('not.exist')
}

export const expectFormFieldErrorFn =
  (field: Omit<ExpectFormFieldErrorArgs[0], 'error'>) =>
  (error?: ExpectFormFieldErrorArgs[0]['error']) =>
    expectFormFieldError({ ...field, error })

export const expectFormFields = (
  fields:
    | Array<FormFieldValueOrErrorOptions>
    | Record<string, FormFieldValueOrErrorOptions>,
  {
    values,
    errors,
    ...options
  }: (
    | {
        values?: Array<string | number | Array<string>>
        errors?: Array<string>
      }
    | {
        values?: Record<string, string | number | Array<string>>
        errors?: Record<string, string>
      }
  ) &
    CommonOptions = {},
) => {
  const mergedFields = mergeFields(fields, { value: values, error: errors })
  forEach(mergedFields, ({ value, placeholder, error, ...fieldSelector }) => {
    if (!isUndefined(value) || !isUndefined(placeholder)) {
      expectFormFieldValue({ ...options, value, placeholder, ...fieldSelector })
    }

    if (error) {
      expectFormFieldError({ ...options, error, ...fieldSelector })
    }
  })
}

export const expectFormFieldsFn =
  (
    fields: ExpectFormFieldsArgs[0],
    options: Omit<ExpectFormFieldsArgs[1], 'values' | 'errors'>,
  ) =>
  (
    values: NonNullable<ExpectFormFieldsArgs[1]>['values'],
    errors: NonNullable<ExpectFormFieldsArgs[1]>['errors'],
  ) =>
    expectFormFields(fields, {
      ...options,
      values,
      errors,
    } as ExpectFormFieldsArgs[1])

export const getSelectDropdown = (options?: CommonOptions) =>
  absoluteRoot(options).find(dropdownSelector, options)

export const scrollSelectDropdown = (
  scrollTo: ScrollPosition,
  options?: CommonOptions,
) => {
  // h4ck: some processing needs to finish before it's possible to interact with the list, it's unclear what
  cy.wait(100) // eslint-disable-line cypress/no-unnecessary-waiting
  getSelectDropdown(options)
    .find('.rc-virtual-list-holder', options)
    .then(($el) =>
      $el[0].scrollTo({ top: scrollToToVerticalPosition(scrollTo) }),
    )
}

export const chooseSelectDropdownOption = (
  value: Label,
  options?: CommonOptions,
) => {
  const opts = logAndMute('chooseSelectOption', value.toString(), options)
  ifOnClock(() => unlockSelectDropdownOptions(opts))
  absoluteRoot(opts)
    .contains(`${dropdownSelector} .ant-select-item-option`, value, opts)
    .click(opts)
}

export const expectSelectDropdownToClose = (options?: CommonOptions) => {
  getSelectDropdown(options).should('not.exist')
}

export const setInputValue =
  (
    subject: any,
    value: string,
    { append, ...options }: { append?: boolean } & CommonOptions = {},
  ) =>
  ($el: JQuery) => {
    if (value) {
      on($el).type(
        append ? value : `{selectall}${value.replace(/{/g, '{{}')}`,
        options,
      )
    } else {
      on($el).clear(options)
    }
  }

export const setSelectValue =
  (
    value?: Label,
    {
      scrollTo,
      ...options
    }: { scrollTo?: ScrollPosition } & TickOptions & CommonOptions = {},
  ) =>
  ($el: JQuery) => {
    if (value) {
      getSelectValuePart(on($el), options).click({ ...options, force: true })
      tickIfOnClock(options)
      tickIfOnClock(options)

      if (scrollTo) {
        scrollSelectDropdown(scrollTo, options)
        tickIfOnClock(options)
      }

      chooseSelectDropdownOption(value, options)
      tickIfOnClock(options)
      expectSelectDropdownToClose(options)
    } else {
      on($el).find('.ant-select-clear', options).click(options)
    }

    return on($el)
  }

export const clearMultiselect = (options?: CommonOptions) => ($el: JQuery) =>
  getSelectValuePart(on($el), options).then(($field) => {
    const removalButtons = $field.find('.ant-select-selection-item-remove')

    if (removalButtons.length) {
      cy.wrap(removalButtons, options).click({ ...options, multiple: true })
    }
  })

export const closeMultiselectOptions =
  (options?: CommonOptions) => ($el: JQuery) =>
    getSelectSearchPart(on($el), options).type('{esc}')

export const setMultiselectValue =
  (
    values: Array<Label> = [],
    {
      append,
      scrollTo: scrollTos,
      ...options
    }: {
      append?: boolean
      scrollTo?: ScrollPosition | Array<ScrollPosition>
    } & TickOptions &
      CommonOptions = {},
  ) =>
  ($el: JQuery) => {
    if (!append) {
      clearMultiselect(options)($el)
    }

    if (isEmpty(values)) {
      return
    }

    getSelectValuePart(on($el), options).click(options)
    tickIfOnClock(options)
    tickIfOnClock(options)
    values.forEach((value, idx) => {
      if (scrollTos) {
        const scrollTo = isArray(scrollTos) ? scrollTos[idx] : scrollTos

        if (scrollTo) {
          scrollSelectDropdown(scrollTo, options)
          tickIfOnClock(options)
        }
      }

      chooseSelectDropdownOption(value, options)
    })
    closeMultiselectOptions(options)($el)

    tickIfOnClock(options)
    expectSelectDropdownToClose(options)
  }

export const setTagsValue =
  (
    values: Array<Label> = [],
    {
      append,
      ...options
    }: { append?: boolean } & TickOptions & CommonOptions = {},
  ) =>
  ($el: JQuery) => {
    if (!append) {
      clearMultiselect(options)($el)
    }

    if (isEmpty(values)) {
      return
    }

    getSelectValuePart(on($el), options).click(options)
    values.forEach((value) =>
      getSelectSearchPart(on($el), options).type(`${value}{enter}`),
    )
    closeMultiselectOptions(options)($el)

    tickIfOnClock(options)
    expectSelectDropdownToClose(options)
  }

export const setRadioValue =
  (value: Label, options?: CommonOptions) => ($el: JQuery) =>
    on($el).contains('.ant-radio-wrapper', value, options).click(options)

export const setDatePickerValue =
  (value?: string, options: CommonOptions = {}) =>
  ($el: JQuery) => {
    if (value) {
      on($el).click().type(`{selectall}${value}{enter}`, options)
    } else {
      // button is shown only on hover
      on($el)
        .siblings('.ant-picker-clear', options)
        .click({ ...options, force: true })
    }

    return on($el)
  }

export const setFormFieldValue = (
  subject: any,
  {
    label,
    type = FIELD_TYPE.INPUT,
    value,
    ...options
  }: FormFieldValueOptions & CommonOptions,
) => {
  const opts = logAndMute('setFieldValue', `${label}: ${value}`, options)
  const getField = () => getFormField(subject, { label, ...opts })
  const getInput = () => getFormInput(subject, { label, type, ...opts })

  // getField().scrollIntoView(opts)

  switch (type) {
    case FIELD_TYPE.CODE_MIRROR:
      getInput().then((codeMirrorEditor: CodeMirror.Editor) => {
        codeMirrorEditor.setValue(String(value))
      })

      return
    case FIELD_TYPE.INPUT:
    case FIELD_TYPE.NUMBER_INPUT:
      getInput().then(
        setInputValue(subject, isNumber(value) ? String(value) : value, opts),
      )

      return
    case FIELD_TYPE.SELECT:
      if (isArray(value)) {
        throw new Error('Select `value` must be a `Label`.')
      }

      if (!label) {
        throw new Error('Label must be set')
      }

      /**
       * For long lists, the target item isn't in view, causing the item to not be selected.
       */
      // getField().then(setSelectValue(value, opts))

      getField()
        .findByLabelText(label)
        .click({ force: true })
        .type(`${value}`, { force: true })

      getSelectDropdown()
        .contains('.ant-select-item', value)
        .click({ force: true })

      return
    case FIELD_TYPE.MULTISELECT:
      if (!isArray(value)) {
        throw new Error('Multiselect `value` must be an array of `Label`s.')
      }

      getField().then(setMultiselectValue(value, opts))

      return
    case FIELD_TYPE.TAGS:
      if (!isArray(value)) {
        throw new Error('Multiselect `value` must be an array of `Label`s.')
      }

      getField().then(setTagsValue(value, opts))

      return
    case FIELD_TYPE.RADIO:
      if (isArray(value) || value === undefined) {
        throw new Error('Select `value` must be a `Label`.')
      }

      getInput().then(setRadioValue(value, opts))

      return
    case FIELD_TYPE.DATE:
      if (isArray(value) || isNumber(value)) {
        throw new Error('Date `value` must be a string.')
      }

      getInput().then(setDatePickerValue(value, opts))

      return
    default:
      throw unsupportedFieldType(type)
  }
}

export const setFormFieldValueFn =
  (field: Omit<SetFormFieldValueArgs[0], 'value'>) =>
  (value: SetFormFieldValueArgs[0]['value']) =>
    setFormFieldValue(cy, { ...field, value })

export const setFormFieldValues = (
  fields:
    | Array<FormFieldValueOrErrorOptions>
    | Record<string, FormFieldValueOrErrorOptions>,
  {
    values,
    ...options
  }: {
    values?:
      | Array<string | number | Array<string>>
      | Record<string, string | number | Array<string>>
  } & CommonOptions = {},
) => {
  const mergedFields = mergeFields(fields, { value: values })
  forEach(mergedFields, (field) => {
    if (!isUndefined(field.value)) {
      setFormFieldValue(cy, { ...options, ...field })
    }
  })
}

export const setFormFieldValuesFn =
  (
    fields: SetFormFieldValuesArgs[0],
    options: Omit<SetFormFieldValuesArgs[1], 'values'>,
  ) =>
  (values: NonNullable<SetFormFieldValuesArgs[1]>['values']) =>
    setFormFieldValues(fields, { ...options, values })
