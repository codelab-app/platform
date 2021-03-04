import 'reflect-metadata'
import { generatorUiSchema } from '../src/processors'
import { GridWithTabs } from './models/GridWithTabs'
import { Human } from './models/Human'
import { Manager } from './models/Manager'
import { Tabs } from './models/Tabs'

describe('Main', () => {
  it('should serialize tabs with accordion', () => {
    const schema = generatorUiSchema(Tabs)

    expect(schema).toMatchObject({
      'ui:ObjectFieldTemplate': 'RjsfTabsFieldTemplate',
      'ui:groups': [
        { title: 'Tab 1', fields: ['a', 'b'] },
        { title: 'Tab 2', fields: ['c', 'accordionSample'] },
      ],
      accordionSample: {
        'ui:ObjectFieldTemplate': 'RjsfAccordionFieldTemplate',
        'ui:groups': [
          { title: 'Accordion 1', fields: ['a', 'b'] },
          { title: 'Accordion 2', fields: ['c'] },
        ],
      },
    })
  })

  it('should serialize grid with tabs', () => {
    const schema = generatorUiSchema(GridWithTabs)

    expect(schema).toMatchObject({
      'ui:ObjectFieldTemplate': 'RjsfGridFieldTemplate',
      'ui:spacing': 16,
      'ui:layout': [
        {
          'ui:order': ['tabsSample', 'firstName'],
          firstName: { span: 12 },
          tabsSample: { span: 12 },
        },
      ],
      tabsSample: {
        'ui:ObjectFieldTemplate': 'RjsfTabsFieldTemplate',
        'ui:groups': [
          { title: 'Tab 1', fields: ['a', 'b'] },
          { title: 'Tab 2', fields: ['c', 'accordionSample'] },
        ],
        accordionSample: {
          'ui:ObjectFieldTemplate': 'RjsfAccordionFieldTemplate',
          'ui:groups': [
            { title: 'Accordion 1', fields: ['a', 'b'] },
            { title: 'Accordion 2', fields: ['c'] },
          ],
        },
      },
    })
  })

  it('should serialize basic object', () => {
    const schema = generatorUiSchema(Human)

    expect(schema).toMatchObject({
      'ui:spacing': 16,
      'ui:layout': [
        {
          'ui:order': ['lastName', 'firstName'],
          firstName: { span: 6 },
          lastName: { span: 8 },
        },
      ],
    })
  })

  it.skip('should serialize with nested props', () => {
    const schema = generatorUiSchema(Manager)

    expect(schema).toMatchObject({
      'ui:spacing': 16,
      'ui:layout': [
        {
          'ui:order': ['firstName', 'lastName'],
          firstName: { span: 6 },
          lastName: { span: 6 },
        },
        {
          project: { span: 24 },
        },
      ],
      project: {
        'ui:spacing': 10,
        'ui:layout': [
          {
            'ui:order': ['name', 'description'],
            name: { span: 6 },
            description: { span: 6 },
          },
          {
            task: { span: 24 },
          },
        ],
        task: {
          'ui:spacing': 5,
          'ui:layout': [
            {
              taskId: { span: 6 },
            },
            {
              taskName: { span: 6 },
            },
          ],
        },
      },
    })
  })
})
