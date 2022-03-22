import { merge } from 'lodash'
import { applyBinding } from './applyBinding'

const sourceProps = {
  sourceProp: {
    nestedSourceProp: {
      sourcePropKey01: 'sourcePropValue01',
      sourcePropKey02: 'sourcePropValue02',
      sourcePropKey03: 'sourcePropValue03',
    },
  },
}

const targetProps = {
  targetProp: {
    nestedTargetProp: {
      targetPropKey: 'sourcePropValue',
    },
  },
}

describe('ApplyBinding', () => {
  it('should bind source prop to target props ', () => {
    const bindings = {
      sourceKey: 'sourceProp.nestedSourceProp.sourcePropKey01',
      targetKey: 'bindingSourceProp.nestedSourceProp.sourcePropKey',
      id: '',
    }

    const expectedProps = {
      targetProp: {
        nestedTargetProp: {
          targetPropKey: 'sourcePropValue',
        },
      },
      bindingSourceProp: {
        nestedSourceProp: {
          sourcePropKey: 'sourcePropValue01',
        },
      },
    }

    const output = applyBinding(targetProps, sourceProps, bindings)

    expect(output).toStrictEqual(expectedProps)
  })

  it('should bind source prop keeping same naming and structure', () => {
    const bindings = {
      sourceKey: 'sourceProp.nestedSourceProp.sourcePropValue01',
      targetKey: '*',
      id: '',
    }

    const output = applyBinding(targetProps, sourceProps, bindings)

    expect(output).toStrictEqual(merge(targetProps, sourceProps))
  })

  it('should bind all source props to target prop', () => {
    const bindings = {
      sourceKey: '*',
      targetKey: 'someProp',
      id: '',
    }

    const output = applyBinding(targetProps, sourceProps, bindings)

    expect(output).toStrictEqual(merge(targetProps, { someProp: sourceProps }))
  })
})
