import {
  AccordionForm as AccordionFormStory,
  AccordionFormV2 as AccordionFormV2Story,
  accordionFormProps,
} from './Form-accordion'
import {
  ConditionalForm as ConditionalFormStory,
  conditionalFormProps,
} from './Form-conditional'
import { FormConditional2 } from './Form-conditional-2'
import { GridsForm as GridsFormStory, gridsFormProps } from './Form-grid'
import {
  GridsFormV2 as GridsFormV2Story,
  gridsFormV2Props,
} from './Form-grid-v2'
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
      GridsFormV2: gridsFormV2Props,
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
export const GridsFormV2 = GridsFormV2Story
export const SelectableForm = SelectableSearchArrayForm
export const TabsForm = TabsFormStory
export const TabsFormV2 = TabsFormV2Story
export const ConditionalForm2 = FormConditional2
