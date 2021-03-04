import {
  RjsfAccordionFieldTemplate,
  RjsfGridFieldTemplate,
  RjsfTabsFieldTemplate,
} from '@codelab/tools/generators/form-templates'

export const schema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 1,
    },
    tabsSample: {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          enum: ['one', 'two'],
        },
        b: {
          type: 'string',
        },
        c: {
          type: 'number',
        },
        accordionSample: {
          type: 'object',
          properties: {
            a: {
              type: 'string',
            },
            b: {
              type: 'string',
            },
            c: {
              type: 'string',
            },
          },
        },
      },
      title: 'Tabs Sample',
    },
  },
  required: ['firstName'],
}
export const uiSchema = {
  'ui:ObjectFieldTemplate': RjsfGridFieldTemplate,
  'ui:spacing': 16,
  'ui:layout': [
    {
      firstName: {
        span: 12,
      },
      'ui:order': ['tabsSample', 'firstName'],
      tabsSample: {
        span: 12,
      },
    },
  ],
  tabsSample: {
    'ui:ObjectFieldTemplate': RjsfTabsFieldTemplate,
    'ui:groups': [
      {
        panelTitle: 'Tab 1',
        fields: ['a', 'b'],
      },
      {
        panelTitle: 'Tab 2',
        fields: ['c', 'accordionSample'],
      },
    ],
    accordionSample: {
      'ui:ObjectFieldTemplate': RjsfAccordionFieldTemplate,
      'ui:groups': [
        {
          panelTitle: 'Accordion 1',
          fields: ['a', 'b'],
        },
        {
          panelTitle: 'Accordion 2',
          fields: [null, null, 'c'],
        },
      ],
    },
  },
}
