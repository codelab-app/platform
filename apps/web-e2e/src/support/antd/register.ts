import omit from 'lodash/omit'
import pick from 'lodash/pick'
import * as commands from './index'

const childCommandNames = [
  'openDropdown',
  'closeDropdown',
  'expectSelectValue',
  'expectSelectPlaceholder',
  'setInputValue',
  'setSelectValue',
  'clearMultiselect',
  'setMultiselectValue',
  'setTagsValue',
  'setRadioValue',
  'showPopover',
  'hidePopover',
  'shouldHaveTooltip',
]

const parentCommands = omit(commands, childCommandNames)

Object.entries(parentCommands).forEach(
  ([commandName, commandImplementation]: [any, any]) =>
    Cypress.Commands.add(
      commandName,
      { prevSubject: false },
      commandImplementation,
    ),
)

const childCommands = pick(commands, childCommandNames)

Object.entries(childCommands).forEach(
  ([commandName, commandImplementation]: [any, any]) =>
    Cypress.Commands.add(
      commandName,
      { prevSubject: 'element' },
      ($subject, ...args) => commandImplementation(...args)($subject),
    ),
)
