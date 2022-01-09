import { IHook } from '@codelab/shared/abstract/core'
import { merge } from 'lodash'
import { ReactElement } from 'react'
import { RenderPipelineProps } from '../../../store'
import { propModifiersPipeline } from '../renderPipeline'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { ResultPipeOutput } from './types'
import { resultPipe } from './utils'

const testHookResponse: RenderPipelineProps = {
  testHookResponse: {
    prop01: 'value01',
    prop02: 'value02',
  },
}

const getHooksResponse = (hooks: Array<IHook>, props: RenderPipelineProps) =>
  testHookResponse

const defaultContext = { getHooksResponse } as RenderContext

const initialProps = {
  prop01: 'prop01Value',
  prop02: 'prop02Value',
  prop03: 'prop03Value',
  [elementToRender.renderForEachPropKey as string]: [
    { prop04: 'prop01Value' },
    { prop05: 'prop02Value' },
    { prop06: 'prop03Value' },
    { prop07: 'prop04Value' },
  ],
  test: {
    source: {
      '01': 'random-value-01',
      '02': 'random-value-02',
      '03': 'random-value-03',
    },
  },
}

describe('PropModifiersPipeline', () => {
  it('should apply modifiers to props', () => {
    const output = propModifiersPipeline(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ReactElement

    const props = output.props.children.map((x: ResultPipeOutput) => x.props)[0] // compare only first element

    expect(props).toStrictEqual({
      key: '0x2786a-0',
      prop01: 'prop01Value',
      'prop01-edited': 'prop01Value',
      prop02: 'prop02Value',
      'prop02-edited': 'prop02Value',
      prop03: 'prop03Value',
      'prop03-edited': 'prop03Value',
      prop04: 'prop01Value',
      renderForEachProp: [
        {
          prop04: 'prop01Value',
        },
        {
          prop05: 'prop02Value',
        },
        {
          prop06: 'prop03Value',
        },
        {
          prop07: 'prop04Value',
        },
      ],
      'renderForEachProp-edited': [
        {
          prop04: 'prop01Value',
        },
        {
          prop05: 'prop02Value',
        },
        {
          prop06: 'prop03Value',
        },
        {
          prop07: 'prop04Value',
        },
      ],
      test: {
        source: {
          '01': 'random-value-01',
          '02': 'random-value-02',
          '03': 'random-value-03',
        },
      },
      'test-edited': {
        source: {
          '01': 'random-value-01',
          '02': 'random-value-02',
          '03': 'random-value-03',
        },
      },
      testHookResponse: {
        prop01: 'value01',
        prop02: 'value02',
      },
      'testHookResponse-edited': {
        prop01: 'value01',
        prop02: 'value02',
      },
      testTarget01: 'random-value-01',
    })
  })

  it('should apply modifiers to context', () => {
    const output = propModifiersPipeline(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ReactElement

    const extraElementProps = output.props.children
      .map((x: ResultPipeOutput) => x.extraElementProps)
      .reduce(merge, {})

    expect(extraElementProps).toStrictEqual({
      '0x2786f': {
        testTarget02: 'random-value-02',
      },
      '0x2786h': {
        testTarget03: 'random-value-03',
      },
    })
  })
})
