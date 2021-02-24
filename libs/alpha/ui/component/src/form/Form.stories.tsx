import {
  AccordionForm as AccordionFormStory,
  AccordionFormV2 as AccordionFormV2Story,
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
import {
  TabsForm as TabsFormStory,
  TabsFormV2 as TabsFormV2Story,
  tabsFormProps,
  tabsFormPropsV2,
} from './Form-tabs'

export default {
  title: 'Json Schema Forms',
  parameters: {
    data: {
      AccordionForm: accordionFormProps,
      ConditionalForm: conditionalFormProps,
      GridsForm: gridsFormProps,
      SelectableForm: selectableSearchArrayFormProps,
      TabsForm: tabsFormProps,
      TabsFormV2: tabsFormPropsV2,
    },
  },
}

export const AccordionForm = AccordionFormStory
export const AccordionFormV2 = AccordionFormV2Story
export const ConditionalForm = ConditionalFormStory
export const GridsForm = GridsFormStory
export const SelectableForm = SelectableSearchArrayForm
export const TabsForm = TabsFormStory
export const TabsFormV2 = TabsFormV2Story
