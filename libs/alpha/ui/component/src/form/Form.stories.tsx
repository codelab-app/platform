import {
  AccordionForm as AccordionFormStory,
  accordionFormProps,
} from './Form-accordion'
import {
  ConditionalForm as ConditionalFormStory,
  conditionalFormProps,
} from './Form-conditional'
import { GridsForm as GridsFormStory, gridsFormProps } from './Form-grid'
import {
  SelectableSearchArrayForm,
  selectableSearchArrayFormProps,
} from './Form-selectable'
import { TabsForm as TabsFormStory } from './Form-tabs'

export default {
  title: 'Json Schema Forms',
  parameters: {
    data: {
      AccordionForm: accordionFormProps,
      ConditionalForm: conditionalFormProps,
      GridsForm: gridsFormProps,
      SelectableForm: selectableSearchArrayFormProps,
      TabsForm: {},
    },
  },
}

export const AccordionForm = AccordionFormStory
export const ConditionalForm = ConditionalFormStory
export const GridsForm = GridsFormStory
export const SelectableForm = SelectableSearchArrayForm
export const TabsForm = TabsFormStory
